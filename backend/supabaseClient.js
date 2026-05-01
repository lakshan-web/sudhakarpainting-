import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

let supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

// Debug logs
console.log('--- Supabase Setup Debug ---');
if (supabaseUrl) {
  // Ensure URL does not end with /rest/v1
  if (supabaseUrl.endsWith('/rest/v1')) {
    supabaseUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, '');
  }
  // Mask the URL for security
  try {
    const parsedUrl = new URL(supabaseUrl);
    const maskedUrl = `${parsedUrl.protocol}//***.${parsedUrl.host.split('.').slice(1).join('.')}`;
    console.log(`SUPABASE_URL loaded: ${maskedUrl}`);
  } catch (e) {
    console.log(`SUPABASE_URL loaded: (Invalid URL format)`);
  }
} else {
  console.log('SUPABASE_URL is MISSING!');
}

if (supabaseKey) {
  console.log('SUPABASE_KEY is loaded successfully.');
} else {
  console.log('SUPABASE_KEY is MISSING!');
}
console.log('----------------------------');

if (!supabaseUrl || !supabaseKey) {
  console.warn("Warning: Database connection will fail without credentials.");
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
console.log('Supabase client initialized.');
