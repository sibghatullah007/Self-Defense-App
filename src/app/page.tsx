"use client";
import { Button } from "@/components/ui/button";
import { Shield, Bell, Video, FileText, Map, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const Index = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      title: "Emergency SOS",
      description: "Send alerts with your location to trusted contacts with one tap.",
      icon: <Bell className="h-10 w-10 text-safety-blue" />,
      path: isAuthenticated ? "/sos" : "/register",
    },
    {
      title: "Self-Defense Tutorials",
      description: "Learn practical self-defense techniques through video tutorials.",
      icon: <Video className="h-10 w-10 text-safety-blue" />,
      path: "/self-defense",
    },
    {
      title: "Incident Reporting",
      description: "Report incidents and access resources tailored to your situation.",
      icon: <FileText className="h-10 w-10 text-safety-blue" />,
      path: "/report",
    },
    {
      title: "Safety Resources Map",
      description: "Find nearby safety resources, support services, and shelters.",
      icon: <Map className="h-10 w-10 text-safety-blue" />,
      path: "/resources",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-safety-dark">
                Your Personal Safety Network
              </h1>
              <p className="text-lg text-gray-600">
                Empower yourself with tools to enhance your safety. Connect with trusted contacts, 
                learn self-defense techniques, and access resources when you need them most.
              </p>
              <div className="flex gap-4">
                <Button size="lg" onClick={() => router.push(isAuthenticated ? "/profile" : "/register") }>
                  {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                </Button>
                <Button variant="outline" size="lg" onClick={() => router.push("/resources") }>
                  Explore Resources
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="bg-safety-blue/10 p-8 rounded-full">
                <Shield className="h-40 w-40 text-safety-blue" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How We Help You Stay Safe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Button variant="link" className="p-0" onClick={() => router.push(feature.path)}>
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      {!isAuthenticated && (
        <section className="py-16 bg-safety-blue/10">
          <div className="container px-4 mx-auto text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Join Our Safety Network Today</h2>
              <p className="text-lg text-gray-700 mb-8">
                Create your account to unlock all features and build your personal safety network.
              </p>
              <Button size="lg" onClick={() => router.push("/register") }>
                <UserPlus className="mr-2 h-5 w-5" />
                Create Free Account
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index; 