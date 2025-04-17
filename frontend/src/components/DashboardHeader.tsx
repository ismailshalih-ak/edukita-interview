// src/components/dashboardHeader.tsx
import { User } from "../types";

interface DashboardHeaderProps {
  user: User;
  onLogout: () => void;
  title?: string;
}

const DashboardHeader = ({ user, onLogout, title = "Student Portal" }: DashboardHeaderProps) => {
  return (
    <header className="bg-white shadow">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        <div className="flex items-center">
          <div className="mr-4 text-gray-700">
            <span className="font-medium">{user.name}</span> 
            <span className="text-gray-500 ml-1">({user.email})</span>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition duration-150 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;