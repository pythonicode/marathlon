import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhbWtrd2N0ZmNhYXlmeGp4eWh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc2Mzk0MDIsImV4cCI6MjAwMzIxNTQwMn0.nZJxLMI-zWZIPtSBuWqR2qxGg7kfXDxuVkWM-JvwcmM';
const SUPABASE_URL = 'https://iamkkwctfcaayfxjxyhu.supabase.co';

const SessionStore = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    storage: SessionStore,
  }
});
