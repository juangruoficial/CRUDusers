import React from "react";

const Header = ({ handleToggleModal }) => {
  return (
    <header className="fixed top-0 w-full text-white bg-gradient-to-r from-blue-500 to-blue-700">
      <nav className="mx-auto max-w-[1024px]">
        <ul className="flex justify-between items-center p-4 md:p-6">
          <li className="text-lg md:text-2xl font-bold">Users</li>
          <li>
            <button
              onClick={handleToggleModal}
              className="flex items-center gap-2 px-4 py-2 bg-blue-900 rounded-md transition duration-300 ease-in-out hover:bg-blue-800 focus:outline-none focus:bg-blue-800"
            >
              <img
                className="w-6 h-6 md:w-8 md:h-8"
                src="/images/sign-up.png"
                alt=""
              />
              <p className="hidden md:block">Sign Up</p>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
