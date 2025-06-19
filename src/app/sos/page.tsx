"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { getCurrentLocation, formatLocation, sendSOSAlert } from "@/services/LocationService";
import { toast } from "sonner";
import { AlertCircle, Check, ChevronLeft, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

const SOS = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isActivated, setIsActivated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customMessage, setCustomMessage] = useState("");

  const handleActivateSOS = async () => {
    if (!user || !user.emergencyContacts || user.emergencyContacts.length === 0) {
      toast.error("Please add emergency contacts first");
      router.push("/profile");
      return;
    }

    setIsLoading(true);
    try {
      const location = await getCurrentLocation();
      const locationUrl = formatLocation(location);
      
      const message = customMessage 
        ? `${customMessage} - Current location:`
        : "SOS ALERT: I need immediate assistance! This is my current location:";
      
      const result = await sendSOSAlert(
        user.emergencyContacts,
        message,
        locationUrl,
        user.name,
        user.email
      );
      const failed = result.results.filter((r: any) => r.status !== 'sent');
      if (failed.length === 0) {
        setIsActivated(true);
        toast.success("SOS alert sent successfully to all emergency contacts");
      } else {
        setIsActivated(true);
        toast.warning(`SOS sent, but some emails failed: ${failed.map((f: any) => f.email).join(', ')}`);
      }
    } catch (error) {
      toast.error("Failed to send SOS alert. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeactivate = () => {
    setIsActivated(false);
    setCustomMessage("");
    toast.success("SOS deactivated");
  };

  return (
    <div className="container max-w-md mx-auto py-12 px-4">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => router.back()}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back
      </Button>

      <Card className={isActivated ? "border-red-500 shadow-lg" : ""}>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Emergency SOS</CardTitle>
          <CardDescription>
            Send an emergency alert with your location to your trusted contacts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isActivated ? (
            <div className="text-center space-y-4">
              <div className="bg-red-100 text-red-700 p-4 rounded-md">
                <div className="flex items-center justify-center mb-2">
                  <AlertCircle className="h-6 w-6 mr-2 animate-pulse" />
                  <span className="font-semibold">SOS ACTIVATED</span>
                </div>
                <p className="text-sm">
                  Your emergency contacts have been notified with your location.
                  Stay safe and try to remain where you are if possible.
                </p>
              </div>
              
              {user && user.emergencyContacts && (
                <div className="text-left">
                  <div className="flex items-center mb-2">
                    <Users className="h-5 w-5 mr-2 text-gray-500" />
                    <span className="font-medium">Notified contacts:</span>
                  </div>
                  <ul className="space-y-1 ml-7 text-sm">
                    {user.emergencyContacts.map(contact => (
                      <li key={contact.id}>
                        <Check className="h-4 w-4 inline-block mr-1 text-green-500" />
                        {contact.name} ({contact.relationship})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <p className="text-gray-600">
                This will send an alert with your current location to all your emergency contacts.
                You can add a custom message below.
              </p>
              
              <Textarea
                placeholder="Add additional details about your emergency (optional)"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="resize-none"
                maxLength={200}
              />
              
              {(!user || !user.emergencyContacts || user.emergencyContacts.length === 0) && (
                <div className="bg-yellow-50 text-yellow-700 p-3 rounded-md text-sm">
                  You need to add emergency contacts before using this feature.
                </div>
              )}
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-center pt-2">
          {isActivated ? (
            <Button 
              onClick={handleDeactivate} 
              variant="outline" 
              className="w-full"
            >
              Deactivate SOS
            </Button>
          ) : (
            <Button
              onClick={handleActivateSOS}
              disabled={
                isLoading || 
                !user || 
                !user.emergencyContacts || 
                user.emergencyContacts.length === 0
              }
              className="bg-safety-red hover:bg-red-600 w-full"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Sending Alert...
                </div>
              ) : (
                <div className="flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Activate SOS Alert
                </div>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SOS; 