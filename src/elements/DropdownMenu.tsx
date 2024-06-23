// src/components/DropdownMenu.tsx
import { useState } from "react";
import Modal from "../components/LogoutModal";
import { Link } from "react-router-dom";
import { User } from "../types/User"; // Assumendo che User.ts si trovi in src/types

interface DropdownMenuProps {
  isLoggedIn: boolean;
  user: User | null;
  isDropdownOpen: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isLoggedIn,
  user,
  isDropdownOpen,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleLogout = () => {};

  const handleLogoutClick = () => {
    setModalOpen(true);
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setModalOpen(false);
  };

  const handleCancelLogout = () => {
    setModalOpen(false);
  };

  return (
    <div
      className={`absolute top-12 right-4 bg-yellow-300 rounded-md shadow-lg ${
        isDropdownOpen ? "block" : "hidden"
      }`}
    >
      {isLoggedIn && user && (
        <div className="flex flex-col items-start p-4">
          <span className="font-body font-bold text-center text-green-900">
            {user.userName}
          </span>
          <span className="mb-2 font-body font-bold text-green-900">
            {user.userNick}
          </span>
          <Link to="/donate">
            <button className="font-body text-green-900 hover:text-green-950">
              Donate
            </button>
          </Link>
          <button
            onClick={handleLogoutClick}
            className="font-body text-green-900 hover:text-green-950"
          >
            Log Off
          </button>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        title="Log Off"
        message="Please log out from the Telegram app to completely terminate your session."
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </div>
  );
};

export default DropdownMenu;
