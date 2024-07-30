import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const supabase = createClient(
  // Supabase API URL - env var exported by default when deployed.
  "https://wjwkhmfvjghjeytpiabs.supabase.co",
  // Supabase API ANON KEY - env var exported by default when deployed.
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indqd2tobWZ2amdoamV5dHBpYWJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4MTMwMTAsImV4cCI6MjAwMzM4OTAxMH0.m41wDr4RySwuUuyjgha_DJwK2-0G1_Mw3aKEOTFBMJc"
);


export const update_last_message_received = async (datetime: string, athlete_id: number) => {
  try {
    await supabase
      .from('athletes')
      .update({ last_message_received: datetime })
      .eq('id', athlete_id)
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const update_last_message_sent = async (datetime: string, athlete_id: number) => {
  try {
    await supabase
      .from('athletes')
      .update({ last_message_sent: datetime })
      .eq('id', athlete_id)
  } catch (error) {
    console.log(error);
    return null;
  }
};