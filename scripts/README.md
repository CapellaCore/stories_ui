# Database Setup Scripts

This directory contains scripts to programmatically create and seed your Supabase database using the API.

## Prerequisites

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up your `.env.local` file** with your Supabase credentials:
   ```env
   REACT_APP_SUPABASE_URL=your_supabase_project_url_here
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

## Available Scripts

### Option 1: Using npm script (Recommended)
```bash
npm run setup-db
```

### Option 2: Direct execution
```bash
node scripts/setup-database.js
```

## What the script does

1. **Creates tables** from `database/schema.sql`
2. **Seeds data** from `database/seed.sql`
3. **Handles errors** gracefully and provides feedback

## Alternative: Manual SQL Execution

If you prefer to run SQL manually, you can:

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `database/schema.sql`
4. Execute the SQL
5. Copy and paste the contents of `database/seed.sql`
6. Execute the SQL

## Troubleshooting

- **Permission errors**: Make sure your Supabase anon key has the necessary permissions
- **SQL errors**: Check that your Supabase project supports the SQL features used in the schema
- **Network errors**: Verify your Supabase URL and internet connection

## Security Notes

- The anon key is safe to use in client-side code
- Never commit your `.env.local` file to version control
- The script uses the anon key for database operations (read-only by default) 