"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Phone, Globe, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { getCurrentLocation } from "@/services/LocationService";

interface Resource {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  website?: string;
  hours?: string;
  description: string;
  services: string[];
}

const resourcesData: Resource[] = [
  {
    id: "res-1",
    name: "Crisis Support Center",
    category: "crisis",
    address: "123 Main Street, Anytown, USA",
    phone: "(555) 123-4567",
    website: "https://crisiscenters.org",
    hours: "24/7",
    description: "Provides emergency counseling, shelter, and support services for individuals in crisis situations.",
    services: ["24/7 Hotline", "Crisis Counseling", "Emergency Shelter", "Safety Planning"]
  },
  {
    id: "res-2",
    name: "Women's Health Center",
    category: "healthcare",
    address: "456 Oak Avenue, Anytown, USA",
    phone: "(555) 234-5678",
    website: "https://womenshealthcenter.org",
    hours: "Mon-Fri: 9am-5pm, Sat: 10am-2pm",
    description: "Comprehensive healthcare services focused on women's health needs and wellness.",
    services: ["Medical Care", "Counseling", "Support Groups", "Education"]
  },
  {
    id: "res-3",
    name: "Legal Aid Society",
    category: "legal",
    address: "789 Elm Street, Anytown, USA",
    phone: "(555) 345-6789",
    website: "https://legalaid.org",
    hours: "Mon-Fri: 8:30am-4:30pm",
    description: "Provides free legal assistance to qualifying individuals for civil matters including protective orders.",
    services: ["Legal Consultation", "Protective Orders", "Court Advocacy", "Legal Document Assistance"]
  },
  {
    id: "res-4",
    name: "Community Counseling Center",
    category: "counseling",
    address: "321 Pine Road, Anytown, USA",
    phone: "(555) 456-7890",
    website: "https://counselingcenter.org",
    hours: "Mon-Thu: 9am-7pm, Fri: 9am-5pm",
    description: "Mental health services including individual and group therapy with sliding scale fees.",
    services: ["Individual Therapy", "Group Therapy", "Trauma Counseling", "Mental Health Resources"]
  },
  {
    id: "res-5",
    name: "Safe Harbor Shelter",
    category: "shelter",
    address: "567 Maple Lane, Anytown, USA",
    phone: "(555) 567-8901",
    hours: "24/7",
    description: "Emergency housing and support services for individuals and families fleeing unsafe situations.",
    services: ["Emergency Housing", "Case Management", "Safety Planning", "Transition Assistance"]
  },
  {
    id: "res-6",
    name: "Family Justice Center",
    category: "legal",
    address: "890 Cedar Court, Anytown, USA",
    phone: "(555) 678-9012",
    website: "https://familyjustice.org",
    hours: "Mon-Fri: 8am-6pm",
    description: "One-stop center for victims of domestic violence, providing multiple services under one roof.",
    services: ["Legal Services", "Advocacy", "Safety Planning", "Child Support"]
  },
  {
    id: "res-7",
    name: "Victim Advocacy Program",
    category: "advocacy",
    address: "432 Birch Street, Anytown, USA",
    phone: "(555) 789-0123",
    website: "https://victimadvocacy.org",
    hours: "Mon-Fri: 9am-5pm, Crisis Line: 24/7",
    description: "Provides advocacy and support for victims navigating the legal system and accessing resources.",
    services: ["Court Accompaniment", "Resource Referrals", "Crisis Support", "Legal System Navigation"]
  },
  {
    id: "res-8",
    name: "Self-Defense Training Center",
    category: "training",
    address: "765 Walnut Drive, Anytown, USA",
    phone: "(555) 890-1234",
    website: "https://selfdefensetraining.org",
    hours: "Mon-Fri: 10am-8pm, Sat-Sun: 9am-3pm",
    description: "Offers classes in various self-defense techniques for all experience levels.",
    services: ["Self-Defense Classes", "Safety Workshops", "Group Training", "Private Lessons"]
  }
];

const Resources = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedResource, setExpandedResource] = useState<string | null>(null);
  const [locationEnabled, setLocationEnabled] = useState(false);

  useEffect(() => {
    // Check if geolocation is supported
    setLocationEnabled(!!navigator.geolocation);
  }, []);

//   const handleFindNearby = async () => {
//     try {
//       const location = await getCurrentLocation();
//       toast.success("We would show resources near your location here");
//       // In a real app, this would filter resources by proximity to location
//     } catch (error) {
//       // Error is already handled in LocationService
//     }
//   };

  const toggleResourceDetails = (id: string) => {
    setExpandedResource(expandedResource === id ? null : id);
  };

  const filteredResources = resourcesData.filter(resource => {
    if (activeTab !== "all" && resource.category !== activeTab) {
      return false;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        resource.name.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.services.some(service => service.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Safety Resources</h1>
          <p className="text-gray-600">
            Find support services, shelters, legal aid, and other resources to help you stay safe.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search resources..."
              className="pl-10"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          {/* <Button 
            onClick={handleFindNearby}
            disabled={!locationEnabled}
            className="whitespace-nowrap"
          >
            <MapPin className="mr-2 h-4 w-4" /> Find Nearby
          </Button> */}
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="crisis">Crisis Support</TabsTrigger>
            <TabsTrigger value="legal">Legal Aid</TabsTrigger>
            <TabsTrigger value="shelter">Shelters</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="mt-0 space-y-6">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <Card key={resource.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{resource.name}</CardTitle>
                      <Badge>{resource.category === "crisis" ? "Crisis Support" : 
                              resource.category === "legal" ? "Legal Aid" :
                              resource.category === "shelter" ? "Shelter" :
                              resource.category === "healthcare" ? "Healthcare" :
                              resource.category === "counseling" ? "Counseling" :
                              resource.category === "advocacy" ? "Advocacy" :
                              resource.category === "training" ? "Training" : 
                              "Resource"}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                        <span className="text-sm">{resource.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        <a href={`tel:${resource.phone}`} className="text-sm text-safety-blue hover:underline">
                          {resource.phone}
                        </a>
                      </div>
                      {resource.hours && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm">{resource.hours}</span>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 pt-2">
                        {resource.services.slice(0, 3).map((service, index) => (
                          <Badge key={index} variant="secondary" className="bg-gray-100">
                            {service}
                          </Badge>
                        ))}
                        {resource.services.length > 3 && !expandedResource && (
                          <Badge variant="secondary" className="bg-gray-100">
                            +{resource.services.length - 3} more
                          </Badge>
                        )}
                      </div>

                      {expandedResource === resource.id && (
                        <div className="mt-4 space-y-3 border-t pt-4">
                          <p className="text-sm text-gray-700">{resource.description}</p>
                          
                          {resource.services.length > 3 && (
                            <div className="flex flex-wrap gap-2">
                              {resource.services.slice(3).map((service, index) => (
                                <Badge key={index} variant="secondary" className="bg-gray-100">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          )}
                          
                          {resource.website && (
                            <div className="flex items-center">
                              <Globe className="h-4 w-4 mr-2 text-gray-500" />
                              <a 
                                href={resource.website} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-sm text-safety-blue hover:underline"
                              >
                                Visit Website
                              </a>
                            </div>
                          )}
                        </div>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleResourceDetails(resource.id)}
                        className="w-full mt-2 flex items-center justify-center"
                      >
                        {expandedResource === resource.id ? (
                          <>
                            <span>Show Less</span>
                            <ChevronUp className="ml-1 h-4 w-4" />
                          </>
                        ) : (
                          <>
                            <span>Show More</span>
                            <ChevronDown className="ml-1 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No resources found matching your search.</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setSearchQuery("");
                    setActiveTab("all");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Need Immediate Help?</h3>
          <p className="text-sm text-gray-700 mb-4">
            If you're in immediate danger, please call emergency services:
          </p>
          <div className="flex space-x-4">
            <Button size="lg" className="bg-safety-red hover:bg-red-600 flex-1"onClick={() => {
                window.location.href = "tel:911";
              }}>
              <Phone className="mr-2 h-5 w-5" />
              Call 911
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="flex-1"
              onClick={() => {
                window.location.href = "tel:+18007997233";
              }}
            >
              National Hotline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources; 