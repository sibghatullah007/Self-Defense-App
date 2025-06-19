import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/empower-safety';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached: any = null;

async function connectDB() {
  if (cached) {
    return cached;
  }

  try {
    cached = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    return cached;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default connectDB; 