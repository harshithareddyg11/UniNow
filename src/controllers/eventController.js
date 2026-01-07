const { supabase } = require('../config/supabase');

exports.createEvent = async (req, res) => {
  const { title, description, college_id, location, eligibility_type, event_date } = req.body;
  try {
    const { data, error } = await supabase
      .from('events')
      .insert([{ 
        title, description, college_id, location, eligibility_type, 
        event_date, created_by: req.user.id 
      }])
      .select();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllEvents = async (req, res) => {
  const { location, eligibility } = req.query;
  try {
    let query = supabase.from('events').select('*, colleges(name)');
    
    if (location) query = query.ilike('location', `%${location}%`);
    if (eligibility) query = query.eq('eligibility_type', eligibility);

    const { data: events, error } = await query;
    if (error) throw error;

    // Apply Eligibility Logic
    const user = req.user;
    const processedEvents = events.map(event => {
      let isEligible = false;

      if (event.eligibility_type === 'open_to_outsiders') {
        isEligible = true;
      } else if (event.eligibility_type === 'open_to_all_colleges') {
        isEligible = !!user.college_id; 
      } else if (event.eligibility_type === 'only_my_college') {
        isEligible = user.college_id === event.college_id;
      }

      return { ...event, isEligible };
    });

    res.status(200).json(processedEvents);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*, colleges(name)')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({ error: 'Event not found' });
  }
};