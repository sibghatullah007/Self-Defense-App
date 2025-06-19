import { toast } from "sonner";

type Coordinates = {
  latitude: number;
  longitude: number;
  accuracy?: number;
};

export const getCurrentLocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      reject(new Error("Geolocation not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        let errorMessage = "Unknown error occurred";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Request to get location timed out";
            break;
        }
        
        toast.error(errorMessage);
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
};

export const formatLocation = (coords: Coordinates): string => {
  return `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`;
};

export async function sendSOSAlert(contacts: any[], message: string, locationUrl: string, senderName?: string, senderEmail?: string) {
  const response = await fetch('/api/sos/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contacts, message, locationUrl, senderName, senderEmail }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to send SOS alert');
  }
  return data;
}
