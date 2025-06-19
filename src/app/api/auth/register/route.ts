import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function POST(request: NextRequest) {
  try {
    console.log('Registration attempt started');
    
    // Connect to MongoDB
    await connectDB();
    console.log('MongoDB connected successfully');

    // Parse request body
    const { name, email, phoneNumber, password } = await request.json();
    console.log('Registration attempt for email:', email);

    // Validate required fields
    if (!name || !email || !phoneNumber || !password) {
      console.log('Missing required fields');
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format');
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      console.log('Password too short');
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    console.log('Existing user check:', existingUser ? 'User exists' : 'No existing user');
    
    if (existingUser) {
      console.log('User already exists');
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Password hashed successfully');

    // Create new user
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phoneNumber: phoneNumber.trim(),
      password: hashedPassword,
      emergencyContacts: [],
    });

    // Save user to database
    const savedUser = await newUser.save();
    console.log('User saved to database with ID:', savedUser._id);

    // Return user data (without password)
    const userResponse = {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      phoneNumber: savedUser.phoneNumber,
      emergencyContacts: savedUser.emergencyContacts,
      createdAt: savedUser.createdAt,
    };

    console.log('Registration successful for user:', savedUser.name);
    return NextResponse.json(
      { 
        message: 'User registered successfully',
        user: userResponse 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 