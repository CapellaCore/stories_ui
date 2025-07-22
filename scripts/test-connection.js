const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Create Supabase client
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    console.log('URL:', process.env.REACT_APP_SUPABASE_URL);
    console.log('Key:', process.env.REACT_APP_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Missing');
    
    // Test basic connection
    const { data, error } = await supabase.from('_sql').select('*').limit(0);
    
    if (error) {
      console.log('Connection test result:', error.message);
    } else {
      console.log('✓ Connection successful!');
    }
    
  } catch (error) {
    console.error('Connection test failed:', error.message);
  }
}

testConnection(); 