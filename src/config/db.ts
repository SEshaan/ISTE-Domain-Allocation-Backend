import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export async function connectToDatabase(): Promise<void> {
  const dbUrl = process.env.DB;
  if (!dbUrl) {
    console.error('Database URL (DB) not provided in environment variables.');
    return;
  }

  try {
    await mongoose.connect(dbUrl);
    console.log('Connected to database');
  } catch (err: any) {
    console.error('Database connection failed:', err.message || err);
    throw err;
  }
}
