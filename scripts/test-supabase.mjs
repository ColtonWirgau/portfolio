import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

// Read .env file
const envFile = readFileSync('.env', 'utf-8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Testing Supabase Connection...\n');
console.log('URL:', supabaseUrl ? '✓ Set' : '✗ Missing');
console.log('Anon Key:', supabaseAnonKey ? '✓ Set' : '✗ Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('\n❌ Missing environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test connection by trying to query the table
const { data, error } = await supabase
  .from('contact_submissions')
  .select('*')
  .limit(1);

if (error) {
  console.error('\n❌ Supabase Error:', error.message);
  console.log('\nMake sure you created the contact_submissions table!');
  console.log('Run this SQL in your Supabase SQL Editor:');
  console.log(`
CREATE TABLE contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON contact_submissions
  FOR INSERT TO anon WITH CHECK (true);
  `);
  process.exit(1);
}

console.log('\n✅ Supabase connection successful!');
console.log('✅ contact_submissions table exists');
console.log('\nYou\'re all set! The contact form should work.');
