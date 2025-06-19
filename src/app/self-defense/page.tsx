"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Tutorial data
const tutorials = [
  {
    id: "basic-1",
    category: "basic",
    title: "Basic Self-Defense Stance",
    description: "Learn the fundamental stance for self-defense situations",
    videoId: "SHV-TEZqLpY",
    length: "5:30",
    level: "beginner"
  },
  {
    id: "basic-2",
    category: "basic",
    title: "Breaking Free from Wrist Grabs",
    description: "Techniques to escape common wrist holds and grabs",
    videoId: "5UDgGcQbkcM",
    length: "8:45",
    level: "beginner"
  },
  {
    id: "escape-1",
    category: "escape",
    title: "Escaping from Bear Hugs",
    description: "How to quickly escape from different types of bear hugs",
    videoId: "T7aNSRoDCmg",
    length: "7:20",
    level: "intermediate"
  },
  {
    id: "escape-2",
    category: "escape",
    title: "Breaking Free from Chokes",
    description: "Safe techniques to escape front and rear chokes",
    videoId: "9_oKYYCmmiw",
    length: "10:15",
    level: "intermediate"
  },
  {
    id: "response-1",
    category: "response",
    title: "Using Everyday Items for Defense",
    description: "How to use common items as defensive tools",
    videoId: "hcc5fm9xvzo",
    length: "6:50",
    level: "beginner"
  },
  {
    id: "response-2",
    category: "response",
    title: "Verbal De-escalation Techniques",
    description: "How to defuse threatening situations with verbal strategies",
    videoId: "G4KLZ0KM7s0",
    length: "9:10",
    level: "beginner"
  },
];

const SelfDefense = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTutorials = tutorials.filter(tutorial => {
    if (activeTab !== "all" && tutorial.category !== activeTab) {
      return false;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        tutorial.title.toLowerCase().includes(query) ||
        tutorial.description.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Self-Defense Tutorials</h1>
          <p className="text-gray-600">
            Learn essential self-defense techniques with these video tutorials. 
            Practice regularly in a safe environment to build muscle memory.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search tutorials..."
            className="pl-10"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="basic">Basic Skills</TabsTrigger>
            <TabsTrigger value="escape">Escapes</TabsTrigger>
            <TabsTrigger value="response">Response</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="mt-0">
            {filteredTutorials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTutorials.map((tutorial) => (
                  <Card key={tutorial.id} className="overflow-hidden">
                    <div className="aspect-video bg-black">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${tutorial.videoId}`}
                        title={tutorial.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                        <Badge className={getLevelColor(tutorial.level)}>
                          {tutorial.level.charAt(0).toUpperCase() + tutorial.level.slice(1)}
                        </Badge>
                      </div>
                      <CardDescription>{tutorial.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{tutorial.length} minutes</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No tutorials found matching your search.</p>
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
          <h3 className="font-semibold text-lg mb-2">Important Note</h3>
          <p className="text-sm text-gray-700">
            These tutorials are for educational purposes only. Regular practice in a safe 
            environment is recommended to build muscle memory. Consider taking in-person 
            classes with qualified instructors for comprehensive training.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelfDefense; 