
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  className?: string;
}

const Header = ({ title, showBackButton = false, className }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className={cn("flex items-center h-16 px-2", className)}>
      {showBackButton && (
        <button 
          onClick={() => navigate(-1)} 
          className="mr-2 rounded-full p-2 hover:bg-gray-100"
          aria-label="Go back"
        >
          <ChevronLeft className="h-5 w-5 text-society-dark-text" />
        </button>
      )}
      <h1 className="text-xl font-semibold text-society-dark-text">{title}</h1>
    </header>
  );
};

export default Header;
