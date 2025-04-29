
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser, logoutUser, isAuthenticated } from "@/utils/authUtils";
import { toast } from "@/components/ui/use-toast";

interface SocietyEvent {
  id: number;
  title: string;
  date: string;
  location: string;
}

interface Member {
  id: string;
  name: string;
  role: string;
  joinDate: string;
}

const SocietyDetails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  
  // Mock society data
  const societyInfo = {
    name: "Community Helpers Society",
    founded: "2020",
    members: 124,
    description: "A volunteer organization dedicated to helping the community through various social service activities.",
  };

  const upcomingEvents: SocietyEvent[] = [
    {
      id: 1,
      title: "Community Cleanup",
      date: "May 15, 2025",
      location: "City Park",
    },
    {
      id: 2,
      title: "Fundraiser Dinner",
      date: "June 2, 2025",
      location: "Community Center",
    },
  ];

  const committeeMembers: Member[] = [
    {
      id: "m-1",
      name: "Jane Smith",
      role: "President",
      joinDate: "Jan 2020",
    },
    {
      id: "m-2",
      name: "John Doe",
      role: "Secretary",
      joinDate: "Mar 2020",
    },
    {
      id: "m-3",
      name: "Emma Wilson",
      role: "Treasurer",
      joinDate: "Feb 2021",
    },
  ];

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated()) {
        navigate("/");
        return;
      }
      
      const userData = getCurrentUser();
      setUser(userData);
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  if (!user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="page-container pb-20">
      <Header title="Society Details" />

      <div className="space-y-6 w-full animate-fade-in">
        {/* User Welcome */}
        <div className="bg-society-purple rounded-lg p-4 text-white">
          <h2 className="text-lg">Welcome, {user.name}!</h2>
          <p className="text-sm opacity-90">Member since April 2025</p>
        </div>

        {/* Society Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{societyInfo.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-society-neutral-gray">{societyInfo.description}</p>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-society-soft-purple p-3 rounded-lg">
                <p className="text-sm text-society-neutral-gray">Founded</p>
                <p className="font-bold text-society-dark-text">{societyInfo.founded}</p>
              </div>
              <div className="bg-society-soft-purple p-3 rounded-lg">
                <p className="text-sm text-society-neutral-gray">Members</p>
                <p className="font-bold text-society-dark-text">{societyInfo.members}</p>
              </div>
              <div className="bg-society-soft-purple p-3 rounded-lg">
                <p className="text-sm text-society-neutral-gray">Events</p>
                <p className="font-bold text-society-dark-text">{upcomingEvents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <div>
          <h2 className="text-xl font-semibold mb-3 px-1">Upcoming Events</h2>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="h-2 bg-society-purple w-full"></div>
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-society-dark-text">{event.title}</h3>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-society-neutral-gray">{event.date}</span>
                    <span className="text-society-neutral-gray">{event.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Committee Members */}
        <div>
          <h2 className="text-xl font-semibold mb-3 px-1">Committee Members</h2>
          <Card>
            <CardContent className="p-0">
              {committeeMembers.map((member, index) => (
                <React.Fragment key={member.id}>
                  <div className="p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-society-neutral-gray">{member.role}</p>
                      </div>
                      <p className="text-xs text-society-neutral-gray self-end">
                        Since {member.joinDate}
                      </p>
                    </div>
                  </div>
                  {index < committeeMembers.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Logout Button */}
        <Button 
          variant="outline" 
          className="w-full border-society-purple text-society-purple hover:bg-society-soft-purple hover:text-society-purple mt-6"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default SocietyDetails;
