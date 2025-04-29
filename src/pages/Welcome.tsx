
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-gradient-to-b from-white to-society-soft-purple p-6">
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-society-dark-text">
            Society Connect
          </h1>
          <p className="text-lg text-society-neutral-gray max-w-xs mx-auto">
            Join your local society organization and stay connected with your community
          </p>
        </div>
        
        <div className="h-48 w-48 rounded-full bg-society-purple bg-opacity-20 flex items-center justify-center">
          <div className="h-36 w-36 rounded-full bg-society-purple bg-opacity-30 flex items-center justify-center">
            <div className="h-24 w-24 rounded-full bg-society-purple flex items-center justify-center text-white text-4xl font-bold">
              SC
            </div>
          </div>
        </div>
        
        <div className="space-y-4 w-full max-w-xs">
          <Button
            onClick={() => navigate("/login")}
            className="w-full bg-society-purple hover:bg-opacity-90 text-white py-3 rounded-lg font-medium"
          >
            Login
          </Button>
          <Button
            onClick={() => navigate("/register")}
            variant="outline"
            className="w-full bg-white hover:bg-gray-50 text-society-purple border-society-purple py-3 rounded-lg font-medium"
          >
            Register
          </Button>
        </div>
      </div>
      
      <p className="text-center text-sm text-society-neutral-gray pt-4">
        © 2025 Society Connect. All rights reserved.
      </p>
    </div>
  );
};

export default Welcome;
