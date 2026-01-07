const { supabase } = require('../config/supabase');

exports.registerForEvent = async (req, res) => {
  const event_id = req.params.id;
  const user_id = req.user.id;

  try {
    // Check eligibility before allowing registration
    const { data: event, error: eventErr } = await supabase
      .from('events')
      .select('*')
      .eq('id', event_id)
      .single();

    if (eventErr || !event) return res.status(404).json({ error: 'Event not found' });

    let isEligible = false;
    if (event.eligibility_type === 'open_to_outsiders') isEligible = true;
    else if (event.eligibility_type === 'open_to_all_colleges') isEligible = !!req.user.college_id;
    else if (event.eligibility_type === 'only_my_college') isEligible = req.user.college_id === event.college_id;

    if (!isEligible) return res.status(403).json({ error: 'You are not eligible for this event' });

    const { data, error } = await supabase
      .from('registrations')
      .insert([{ event_id, user_id }])
      .select();

    if (error) throw error;
    res.status(201).json({ message: 'Registered successfully', data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getRegistrationsForOrganizer = async (req, res) => {
  const event_id = req.params.id;
  try {
    // Verify event belongs to this organizer
    const { data: event } = await supabase
      .from('events')
      .select('created_by')
      .eq('id', event_id)
      .single();

    if (event.created_by !== req.user.id) return res.status(403).json({ error: 'Forbidden' });

    const { data, error } = await supabase
      .from('registrations')
      .select('id, created_at, users(name, email, location)')
      .eq('event_id', event_id);

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};