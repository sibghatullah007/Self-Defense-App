"use client";
import { useState } from "react";
import { useAuth, EmergencyContact } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { UserCircle, UserPlus, Trash2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  relationship: z.string().min(2, "Please specify the relationship"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Profile = () => {
  const { user, addEmergencyContact, removeEmergencyContact } = useAuth();
  const [showAddContactDialog, setShowAddContactDialog] = useState(false);
  const router = useRouter();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      relationship: "",
      email: "",
    },
  });

  if (!user) {
    router.replace("/login");
    return null;
  }

  const handleAddContact = async (values: ContactFormValues) => {
    await addEmergencyContact({
      name: values.name,
      phoneNumber: values.phoneNumber,
      relationship: values.relationship,
      email: values.email,
    });
    setShowAddContactDialog(false);
    form.reset();
  };

  const handleRemoveContact = async (contactId: string) => {
    await removeEmergencyContact(contactId);
  };

  const handleUploadPhoto = () => {
    toast.info("Photo upload functionality would be implemented here");
  };

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="text-gray-600">Manage your account and emergency contacts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <UserCircle className="h-16 w-16 text-gray-400" />
                </div>
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="absolute bottom-0 right-0"
                  onClick={handleUploadPhoto}
                >
                  Change
                </Button>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <p className="text-gray-500 text-sm">{user.email}</p>
                {user.phoneNumber && (
                  <p className="text-gray-500 text-sm">{user.phoneNumber}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Emergency Contacts</CardTitle>
                <CardDescription>
                  These people will be contacted when you activate the SOS feature
                </CardDescription>
              </div>
              <Button 
                size="sm" 
                onClick={() => setShowAddContactDialog(true)}
              >
                <UserPlus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </CardHeader>
            <CardContent>
              {user.emergencyContacts && user.emergencyContacts.length > 0 ? (
                <div className="space-y-4">
                  {user.emergencyContacts.map((contact) => (
                    <div 
                      key={contact.id || (contact as any)._id} 
                      className="border rounded-lg p-4 flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-medium">{contact.name}</h4>
                        <p className="text-sm text-gray-500">{contact.relationship}</p>
                        <p className="text-sm">{contact.phoneNumber}</p>
                        {contact.email && <p className="text-sm">{contact.email}</p>}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-500 hover:text-destructive"
                        onClick={() => handleRemoveContact(contact.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No emergency contacts added yet</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Add trusted contacts who will be notified in case of emergency
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showAddContactDialog} onOpenChange={setShowAddContactDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Emergency Contact</DialogTitle>
            <DialogDescription>
              Add someone you trust who can be contacted in case of emergency
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddContact)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="(123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="contact@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="relationship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relationship</FormLabel>
                    <FormControl>
                      <Input placeholder="Family, Friend, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">Add Contact</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile; 