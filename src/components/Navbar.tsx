"use client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X, Shield, LogOut, User } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Self Defense", path: "/self-defense" },
    { name: "Report Incident", path: "/report" },
    { name: "Resources", path: "/resources" },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Shield className="h-8 w-8 text-safety-blue" />
              <span className="ml-2 text-xl font-semibold text-safety-dark">
                Empower Safety
              </span>
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="text-gray-700 hover:text-safety-blue px-3 py-2 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <User className="mr-1 h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center">
                  <LogOut className="mr-1 h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => router.push("/login")}>
                  Login
                </Button>
                <Button size="sm" onClick={() => router.push("/register")}>
                  Register
                </Button>
              </div>
            )}
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <Button variant="ghost" onClick={toggleMenu} className="inline-flex items-center justify-center p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="space-y-1 px-2">
                <Link
                  href="/profile"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-1 px-2">
                <Link
                  href="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
