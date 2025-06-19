"use client";
import { useState } from "react";

const TestDB = () => {
  const [testResult, setTestResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    setIsLoading(true);
    setTestResult("Testing MongoDB connection...");
    
    try {
      const response = await fetch('/api/test-db');
      const data = await response.json();
      
      if (response.ok) {
        setTestResult(`✅ ${data.message}`);
      } else {
        setTestResult(`❌ Connection failed: ${data.error}\nDetails: ${data.details}`);
      }
    } catch (error) {
      setTestResult(`❌ Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testRegistration = async () => {
    setIsLoading(true);
    setTestResult("Testing registration...");
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          phoneNumber: "123-456-7890",
          password: "password123"
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setTestResult(`✅ Registration successful! User ID: ${data.user.id}`);
      } else {
        setTestResult(`❌ Registration failed: ${data.error}`);
      }
    } catch (error) {
      setTestResult(`❌ Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testLogin = async () => {
    setIsLoading(true);
    setTestResult("Testing login...");
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: "test@example.com",
          password: "password123"
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setTestResult(`✅ Login successful! Welcome ${data.user.name}`);
      } else {
        setTestResult(`❌ Login failed: ${data.error}`);
      }
    } catch (error) {
      setTestResult(`❌ Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-md mx-auto py-12 px-4">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Database Test</h1>
          <p className="text-gray-500 mt-2">
            Test MongoDB connection and API endpoints
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={testConnection}
            disabled={isLoading}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            {isLoading ? "Testing..." : "Test MongoDB Connection"}
          </button>

          <button
            onClick={testRegistration}
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? "Testing..." : "Test Registration"}
          </button>

          <button
            onClick={testLogin}
            disabled={isLoading}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {isLoading ? "Testing..." : "Test Login"}
          </button>
        </div>

        {testResult && (
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <h3 className="font-semibold mb-2">Test Result:</h3>
            <pre className="text-sm whitespace-pre-wrap">{testResult}</pre>
          </div>
        )}

        <div className="text-sm text-gray-500">
          <p>Check the browser console and server logs for detailed information.</p>
          <p className="mt-2">
            <strong>Current MongoDB URI:</strong> mongodb://localhost:27017/empower-safety
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestDB; 