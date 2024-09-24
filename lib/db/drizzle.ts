import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL environment variable is not set');
}

// Create a postgres client with SSL configuration
const client = postgres(process.env.POSTGRES_URL, {
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 10, // Set the maximum number of connections in the pool
  idle_timeout: 20, // Close idle connections after 20 seconds
});

// Create a drizzle instance
export const db = drizzle(client, { schema });

// Export the client for direct use if needed
export { client };

// Graceful shutdown function
async function gracefulShutdown() {
  console.log('Closing database connections...');
  await client.end();
  console.log('Database connections closed.');
  process.exit(0);
}

// Handle graceful shutdowns
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);