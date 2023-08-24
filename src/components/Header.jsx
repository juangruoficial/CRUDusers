import React from "react";
import HeaderButton from "./HeaderButton";

const Header = ({ handleToggleModal, isLogged, userLogged }) => {
  const TITLENAVPAGE = isLogged
    ? `Welcome ${userLogged.first_name} ${userLogged.last_name}`
    : "Create your account";
  const logout = isLogged ? "Log out" : "Log in";
  const logoutIcon = isLogged
    ? "/images/login.png"
    : "/images/user-profile.png";

  return (
    <header className="fixed top-0 w-full text-white bg-gray-800 py-2 shadow-md">
      <nav className="mx-auto max-w-[1024px]">
        <ul className="flex justify-between items-center p-4 md:p-6">
          <li className="text-lg sm:text-2xl xl:text-3xl md:text-2xl font-bold">
            {TITLENAVPAGE}
          </li>
          <li className="flex gap-1 sm:gap-5">
            <HeaderButton
              onClick={() => handleToggleModal(isLogged ? "logout" : "login")}
              iconSrc={logoutIcon}
              label={logout}
            />

            {!isLogged && (
              <HeaderButton
                onClick={() => handleToggleModal("user")}
                iconSrc="/images/sign-up.png"
                label="Sign Up"
              />
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
