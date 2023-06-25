import 'react-native-url-polyfill/auto';
import {createClient} from '@supabase/supabase-js';

const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhbWtrd2N0ZmNhYXlmeGp4eWh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc2Mzk0MDIsImV4cCI6MjAwMzIxNTQwMn0.nZJxLMI-zWZIPtSBuWqR2qxGg7kfXDxuVkWM-JvwcmM';
const SUPABASE_URL = 'https://iamkkwctfcaayfxjxyhu.supabase.co';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
