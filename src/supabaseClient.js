import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://elzevmvryinyffkkpamh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsemV2bXZyeWlueWZma2twYW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNjg2OTIsImV4cCI6MjA3Njg0NDY5Mn0.wx0Z8UeYvnBDe3vwKuG7qesUzlJwIKVsw7By_AnnLEI";

export const supabase = createClient(supabaseUrl, supabaseKey);
