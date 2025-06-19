"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  profilePicture?: string;
  emergencyContacts?: EmergencyContact[];
};

export type EmergencyContact = {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  relationship: string;
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  register: (name: string, email: string, phoneNumber: string, password: string, onSuccess?: () => void) => Promise<void>;
  login: (email: string, password: string, onSuccess?: () => void) => Promise<void>;
  logout: () => void;
  addEmergencyContact: (contact: Omit<EmergencyContact, "id">) => void;
  removeEmergencyContact: (contactId: string) => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for stored user on mount
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error parsing stored user:", error);
      // Clear invalid data from localStorage
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = async (name: string, email: string, phoneNumber: string, password: string, onSuccess?: () => void) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phoneNumber,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Don't throw error, just show toast and return
        toast.error(data.error || 'Registration failed. Please try again.');
        return;
      }

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Registration successful!");
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      // Handle network or other errors gracefully
      console.error('Registration error:', error);
      toast.error('Unable to connect to server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string, onSuccess?: () => void) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Don't throw error, just show toast and return
        toast.error(data.error || 'Login failed. Please check your credentials.');
        return;
      }

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success(`Welcome back, ${data.user.name}!`);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      // Handle network or other errors gracefully
      console.error('Login error:', error);
      toast.error('Unable to connect to server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("You have been logged out");
  };

  const addEmergencyContact = async (contact: Omit<EmergencyContact, "id">) => {
    if (!user) return;
    try {
      const response = await fetch('/api/emergency-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          ...contact,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || 'Failed to add contact');
        return;
      }
      const updatedContacts = [...(user.emergencyContacts || []), data.contact];
      const updatedUser = { ...user, emergencyContacts: updatedContacts };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Emergency contact added successfully");
    } catch (error) {
      toast.error('Failed to add contact');
    }
  };

  const removeEmergencyContact = async (contactId: string) => {
    if (!user) return;
    try {
      const response = await fetch('/api/emergency-contact', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          contactId,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || 'Failed to remove contact');
        return;
      }
      const updatedContacts = (user.emergencyContacts || []).filter(c => c.id !== contactId);
      const updatedUser = { ...user, emergencyContacts: updatedContacts };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Emergency contact removed");
    } catch (error) {
      toast.error('Failed to remove contact');
    }
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement password reset API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Password reset link sent to your email");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Password reset failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        register,
        login,
        logout,
        addEmergencyContact,
        removeEmergencyContact,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
