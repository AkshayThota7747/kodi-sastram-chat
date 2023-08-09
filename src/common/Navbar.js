import React, { useState } from "react";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import TabPanel from "./TabPanel";

const Navbar = ({ tabs, activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {});
  };

  return (
    <nav className="flex items-center justify-between pt-4 pb-2">
      <TabPanel tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />{" "}
      <div className="flex items-center mr-4">
        {/* <div className="relative mr-4 mt-1">
          <FontAwesomeIcon icon={faBell} className="text-xl text-[#D0E6FF]" />
          <span className="absolute top-0 right-0 -mt-2 -mr-2 px-1 py-0 bg-red-500 text-white rounded-full text-xs">
            3
          </span>
        </div> */}
        <div className="relative">
          <button className="flex items-center focus:outline-none" onClick={handleDropdownToggle}>
            <img className="w-10 h-10 rounded-full object-cover" src={auth.currentUser?.photoURL} alt="Profile" />
          </button>

          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50">
              <li>
                <button
                  className="text-center w-full block px-2 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
