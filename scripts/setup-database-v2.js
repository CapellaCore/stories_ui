const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Create Supabase client
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function createTables() {
  try {
    console.log('Creating database tables...');

    // Read the SQL schema file
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

    // Split SQL into individual statements and filter out comments
    const statements = schemaSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => {
        const trimmed = stmt.trim();
        return trimmed.length > 0 && !trimmed.startsWith('--');
      });

    // Execute each statement using the client
    for (const statement of statements) {
      if (statement.trim()) {
        console.log(`Executing: ${statement.substring(0, 50)}...`);
        try {
          const { data, error } = await supabase.rpc('exec_sql', { sql: statement });
          
          if (error) {
            // If exec_sql doesn't exist, try alternative approach
            console.log('exec_sql not available, trying direct SQL execution...');
            const { error: directError } = await supabase.from('_sql').select('*').limit(0);
            
            if (directError) {
              console.error(`✗ Error executing statement: ${error.message}`);
              console.log('Note: You may need to run this SQL manually in the Supabase SQL Editor');
            }
          } else {
            console.log('✓ Statement executed successfully');
          }
        } catch (error) {
          console.error(`✗ Error executing statement: ${error.message}`);
        }
      }
    }

    console.log('Tables creation completed!');

  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

async function seedData() {
  try {
    console.log('Seeding database with initial data...');

    // Read the seed SQL file
    const seedPath = path.join(__dirname, '../database/seed.sql');
    const seedSQL = fs.readFileSync(seedPath, 'utf8');

    // Split SQL into individual statements and filter out comments
    const statements = seedSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => {
        const trimmed = stmt.trim();
        return trimmed.length > 0 && !trimmed.startsWith('--');
      });

    // Execute each statement
    for (const statement of statements) {
      if (statement.trim()) {
        console.log(`Executing: ${statement.substring(0, 50)}...`);
        try {
          const { data, error } = await supabase.rpc('exec_sql', { sql: statement });
          
          if (error) {
            console.error(`✗ Error executing statement: ${error.message}`);
          } else {
            console.log('✓ Statement executed successfully');
          }
        } catch (error) {
          console.error(`✗ Error executing statement: ${error.message}`);
        }
      }
    }

    console.log('Data seeding completed!');

  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

// Alternative: Create tables using individual API calls
async function createTablesManually() {
  try {
    console.log('Creating tables using individual API calls...');

    // Create tags table
    console.log('Creating tags table...');
    const { error: tagsError } = await supabase
      .from('tags')
      .select('*')
      .limit(0);
    
    if (tagsError && tagsError.message.includes('relation "tags" does not exist')) {
      console.log('Tags table does not exist - you need to create it manually in Supabase SQL Editor');
    }

    // Create stories table
    console.log('Creating stories table...');
    const { error: storiesError } = await supabase
      .from('stories')
      .select('*')
      .limit(0);
    
    if (storiesError && storiesError.message.includes('relation "stories" does not exist')) {
      console.log('Stories table does not exist - you need to create it manually in Supabase SQL Editor');
    }

    console.log('Table check completed!');

  } catch (error) {
    console.error('Error checking tables:', error);
  }
}

// Run the functions
async function main() {
  console.log('Starting database setup...');
  console.log('Note: This script will attempt to create tables and seed data.');
  console.log('Some operations may fail if tables already exist - this is normal.\n');
  
  await createTables();
  await createTablesManually(); // Fallback check
  await seedData();
  
  console.log('\nDatabase setup completed!');
  console.log('Check your Supabase dashboard to verify the tables were created correctly.');
  console.log('\nIf tables were not created, you may need to run the SQL manually:');
  console.log('1. Go to your Supabase dashboard');
  console.log('2. Navigate to SQL Editor');
  console.log('3. Copy and paste the contents of database/schema.sql');
  console.log('4. Execute the SQL');
}

main(); 