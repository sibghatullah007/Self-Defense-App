"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ClearStorage = () => {
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    try {
      // Clear localStorage
      localStorage.clear();
      setMessage("✅ localStorage cleared successfully!");
      
      // Redirect to home page after 2 seconds
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      setMessage(`❌ Error clearing localStorage: ${error}`);
    }
  }, [router]);

  return (
    <div className="container max-w-md mx-auto py-12 px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Clearing Storage</h1>
        <p className="text-gray-600">{message}</p>
        <p className="text-sm text-gray-500 mt-4">
          Redirecting to home page...
        </p>
      </div>
    </div>
  );
};

export default ClearStorage; 