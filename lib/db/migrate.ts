import dotenv from 'dotenv';
import path from 'path';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { client, db } from './drizzle';

// Load environment variables
dotenv.config();

async function main() {
  try {
    console.log('Starting database migration...');
    await migrate(db, {
      migrationsFolder: path.join(process.cwd(), '/lib/db/migrations'),
    });
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  } finally {
    await client.end();
    console.log('Database connection closed');
  }
}

main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});