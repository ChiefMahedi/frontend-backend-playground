import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn, faHouse, faUser, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        className="fixed top-4 right-4 z-50 text-white bg-gray-900 p-2 rounded-md focus:outline-none mobile:block tablet:hidden"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={isOpen ? faXmark : faBars} className="text-2xl" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-sidebar text-white flex flex-col z-40 transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } tablet:translate-x-0 tablet:static tablet:w-64`}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-6 py-4 bg-gray-900 shadow-md">
          <FontAwesomeIcon icon={faChartColumn} className="text-2xl text-yellow-500" />
          <span className="text-2xl font-semibold font-poppins">SalesCRM</span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col mt-8 space-y-1">
          <NavItem icon={faHouse} label="Dashboard" isActive={true} redirectTo="/" />
          <NavItem icon={faUser} label="Customers" redirectTo="/customers" />
          <NavItem icon={faUser} label="Products" redirectTo="/products" />
        </nav>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 mobile:block tablet:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}

const NavItem = ({
  icon,
  label,
  redirectTo,
  isActive = false,
}: {
  icon: IconProp;
  label: string;
  redirectTo: string;
  isActive?: boolean;
}) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(redirectTo); 
  };

  return (
    <div
      className={`flex items-center px-6 py-3 text-sm font-medium cursor-pointer transition-all duration-200 ${
        isActive
          ? 'bg-gray-700 text-yellow-500 shadow-inner'
          : 'text-gray-400 hover:bg-gray-700 hover:text-yellow-500'
      }`}
      onClick={handleNavigation}
    >
      <div className="flex-shrink-0 flex items-center justify-center w-5 h-5">
        <FontAwesomeIcon icon={icon} className="text-base" />
      </div>
      <span className="flex-1 ml-3 font-poppins">{label}</span>
      {isActive && (
        <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
      )}
    </div>
  );
};
