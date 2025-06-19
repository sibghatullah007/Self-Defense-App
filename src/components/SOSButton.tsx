"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { getCurrentLocation, formatLocation, sendSOSAlert } from "@/services/LocationService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const SOSButton = () => {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { user } = useAuth();

  const handleEmergencyActivation = async () => {
    if (!user) {
      toast.error("Please log in to use the SOS feature");
      return;
    }

    if (!(user.emergencyContacts && user.emergencyContacts.length > 0)) {
      toast.error("Please add emergency contacts first");
      return;
    }

    setShowConfirmation(true);
  };

  const confirmSOS = async () => {
    setIsLoading(true);
    setShowConfirmation(false);
    setIsActive(true);
    
    try {
      const location = await getCurrentLocation();
      const locationUrl = formatLocation(location);
      
      const message = "SOS ALERT: I need help immediately! This is my current location:";
      
      if (user && user.emergencyContacts) {
        const result = await sendSOSAlert(
          user.emergencyContacts,
          message,
          locationUrl,
          user.name,
          user.email
        );
        const failed = result.results.filter((r: any) => r.status !== 'sent');
        if (failed.length === 0) {
          toast.success("SOS alert sent successfully to all emergency contacts");
        } else {
          toast.warning(`SOS sent, but some emails failed: ${failed.map((f: any) => f.email).join(', ')}`);
        }
      }
    } catch (error) {
      toast.error("Failed to send SOS alert. Please try again.");
      setIsActive(false);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelSOS = () => {
    setShowConfirmation(false);
  };

  const deactivateSOS = () => {
    setIsActive(false);
    toast.success("SOS alert deactivated");
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        <Button
          size="lg"
          disabled={isLoading}
          onClick={isActive ? deactivateSOS : handleEmergencyActivation}
          className={`rounded-full h-16 w-16 flex items-center justify-center ${
            isActive
              ? "bg-safety-red text-white animate-pulse hover:bg-red-600"
              : "bg-safety-red text-white hover:bg-red-600"
          } shadow-lg transition-all sos-button`}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          ) : (
            <AlertCircle className={`h-8 w-8 ${isActive ? "animate-pulse" : ""}`} />
          )}
        </Button>
      </div>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm SOS Alert</DialogTitle>
            <DialogDescription>
              This will send an emergency alert with your current location to all your emergency contacts.
              Are you sure you want to proceed?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center gap-4">
            <Button variant="outline" onClick={cancelSOS}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmSOS}>
              Send SOS Alert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SOSButton;
