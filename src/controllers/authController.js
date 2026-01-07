const { supabase, supabaseAdmin } = require('../config/supabase');

exports.signup = async (req, res) => {
  const { email, password, name, role, college_id, location } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    const { error: profileError } = await supabaseAdmin
      .from('users')
      .insert([{ id: data.user.id, email, name, role, college_id, location }]);

    if (profileError) throw profileError;
    res.status(201).json({ message: 'User registered', user: data.user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    res.status(200).json({ token: data.session.access_token, user: data.user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};