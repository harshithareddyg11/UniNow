import { supabase } from "../supabaseClient";

export const fetchEvents = async () => {
  return await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false });
};
