const { Client } = require('pg');

async function checkTables() {
  const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_sWPK7bxaXEI5@ep-plain-sky-ad19xynj-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  });

  try {
    await client.connect();
    console.log('Connected to database successfully!');
    
    console.log('Checking table names...');
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);
    
    console.log('Tables found:');
    tablesResult.rows.forEach(table => console.log('- ' + table.table_name));
    
    // Check if account table exists
    const accountTable = tablesResult.rows.find(t => t.table_name === 'account');
    if (accountTable) {
      console.log('\nChecking account table structure...');
      const accountColumnsResult = await client.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns 
        WHERE table_name = 'account' 
        AND table_schema = 'public'
        ORDER BY ordinal_position;
      `);
      
      console.log('Account table columns:');
      accountColumnsResult.rows.forEach(col => console.log(`- ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'not null'})`));
    } else {
      console.log('\nAccount table not found!');
    }
    
    // Check user vs users table
    const userTable = tablesResult.rows.find(t => t.table_name === 'user');
    const usersTable = tablesResult.rows.find(t => t.table_name === 'users');
    
    if (userTable) {
      console.log('\nChecking user table structure...');
      const userColumnsResult = await client.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns 
        WHERE table_name = 'user' 
        AND table_schema = 'public'
        ORDER BY ordinal_position;
      `);
      
      console.log('User table columns:');
      userColumnsResult.rows.forEach(col => console.log(`- ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'not null'})`));
    }
    
    if (usersTable) {
      console.log('\nChecking users table structure...');
      const usersColumnsResult = await client.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns 
        WHERE table_name = 'users' 
        AND table_schema = 'public'
        ORDER BY ordinal_position;
      `);
      
      console.log('Users table columns:');
      usersColumnsResult.rows.forEach(col => console.log(`- ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'not null'})`));
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

checkTables();