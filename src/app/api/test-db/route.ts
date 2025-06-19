import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('Testing MongoDB connection...');
    
    // Test connection
    await connectDB();
    console.log('MongoDB connection successful');
    
    return NextResponse.json(
      { 
        message: 'MongoDB connection successful',
        status: 'connected'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('MongoDB connection test failed:', error);
    return NextResponse.json(
      { 
        error: 'MongoDB connection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 