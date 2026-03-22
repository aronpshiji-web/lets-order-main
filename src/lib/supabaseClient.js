import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://psxtywfmohnvytrfedjs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzeHR5d2Ztb2hudnl0cmZlZGpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MTg0MjQsImV4cCI6MjA4NzM5NDQyNH0.s6CS6ruWkA2J6IL7y4UDVyET5P_WKzHugbMYrxV9jTM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
