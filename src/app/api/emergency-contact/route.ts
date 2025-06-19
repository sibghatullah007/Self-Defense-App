import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

// Add Emergency Contact
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { userId, name, phoneNumber, relationship, email } = await request.json();
    if (!userId || !name || !phoneNumber || !relationship) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    // Add contact to user's emergencyContacts array
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const newContact = { name, phoneNumber, relationship, email };
    user.emergencyContacts.push(newContact);
    await user.save();
    // Return the last contact (just added)
    const addedContact = user.emergencyContacts[user.emergencyContacts.length - 1];
    // Map _id to id for frontend
    const contactWithId = { ...addedContact.toObject(), id: addedContact._id };
    return NextResponse.json({ contact: contactWithId }, { status: 201 });
  } catch (error) {
    console.error('Add emergency contact error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Delete Emergency Contact
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const { userId, contactId } = await request.json();
    if (!userId || !contactId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    user.emergencyContacts = user.emergencyContacts.filter((c: any) => c._id.toString() !== contactId);
    await user.save();
    return NextResponse.json({ message: 'Contact deleted' }, { status: 200 });
  } catch (error) {
    console.error('Delete emergency contact error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 