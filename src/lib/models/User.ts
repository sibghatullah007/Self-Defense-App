import mongoose, { Schema, Document } from 'mongoose';

export interface IEmergencyContact {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  relationship: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  profilePicture?: string;
  emergencyContacts: IEmergencyContact[];
  createdAt: Date;
  updatedAt: Date;
}

const EmergencyContactSchema = new Schema<IEmergencyContact>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  relationship: {
    type: String,
    required: true,
    trim: true,
  },
}, { _id: true });

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  emergencyContacts: [EmergencyContactSchema],
}, {
  timestamps: true,
});

// Prevent duplicate model initialization
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema); 