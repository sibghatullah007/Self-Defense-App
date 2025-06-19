import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function POST(request: NextRequest) {
  try {
    console.log('Login attempt started');
    
    // Connect to MongoDB
    await connectDB();
    console.log('MongoDB connected successfully');

    // Parse request body
    const { email, password } = await request.json();
    console.log('Login attempt for email:', email);

    // Validate required fields
    if (!email || !password) {
      console.log('Missing email or password');
      return NextResponse.json(
        { error: 'Please enter both email and password' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('User not found in database');
      return NextResponse.json(
        { error: 'Email or password is incorrect' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('Invalid password');
      return NextResponse.json(
        { error: 'Email or password is incorrect' },
        { status: 401 }
      );
    }

    // Return user data (without password)
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      emergencyContacts: user.emergencyContacts,
      createdAt: user.createdAt,
    };

    console.log('Login successful for user:', user.name);
    return NextResponse.json(
      { 
        message: 'Login successful',
        user: userResponse 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 