import React from "react";
import { useUserManagement } from "../Hooks/useUserManagment";

const TITLENAVPAGE = "CRUD Users";

const Header = ({ handleToggleModal, isLogged }) => {
  const logout = isLogged ? "Log out" : "Log in";
  const logoutIcon = isLogged
    ? "/images/login.png"
    : "/images/user-profile.png";
  console.log("isLogged", isLogged);
  return (
    <header className="fixed top-0 w-full text-white bg-gray-800 py-2 shadow-md">
      <nav className="mx-auto max-w-[1024px]">
        <ul className="flex justify-between items-center p-4 md:p-6">
          <li className="text-lg md:text-2xl font-bold">{TITLENAVPAGE}</li>
          <li className="flex gap-8">
            <button
              onClick={() => handleToggleModal(isLogged ? "logout" : "login")}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-md transition duration-300 ease-in-out hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              <img className="w-6 h-6 md:w-8 md:h-8" src={logoutIcon} alt="" />
              <p className="hidden sm:block">{logout}</p>
            </button>

            <button
              onClick={() => handleToggleModal("user")}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-md transition duration-300 ease-in-out hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              <img
                className="w-6 h-6 md:w-8 md:h-8"
                src="/images/sign-up.png"
                alt=""
              />
              <p className="hidden sm:block">Sign Up</p>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
