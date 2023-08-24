import { useState, useEffect } from "react";
import {
  getAllUsers,
  createUser as apiCreateUser,
  deleteUser as apiDeleteUser,
  updateUser as apiUpdateUser,
} from "../Services/apiFunctions.js";

import { EMPTY_FORM_VALUES, iconUrls } from "../shared/constants.js";

export const useUserManagement = () => {
  const [userData, setUserData] = useState({
    isShowingModal: false,
    isUpdatingUser: null,
    users: [],
    urlicon: false,
    isShowingPopUp: false,
    messagePopUp: "",
    isLoginUser: false,
    isLogged: false,
    userLogged: null,
  });

  const showPopUp = (message, icon) => {
    setUserData((prevData) => ({
      ...prevData,
      isShowingPopUp: true,
      messagePopUp: message,
      urlicon: iconUrls[icon],
    }));
    setTimeout(() => {
      setUserData((prevData) => ({
        ...prevData,
        isShowingPopUp: false,
      }));
    }, 2000);
  };

  const closeModal = () => {
    setUserData((prevData) => ({
      ...prevData,
      isUpdatingUser: null,
      isShowingModal: false,
      isLoginUser: false,
    }));
  };

  const fetchUsers = () => {
    getAllUsers().then(({ data }) => {
      setUserData((prevData) => ({
        ...prevData,
        users: data,
      }));
    });
  };

  const checkEmailExists = (email) =>
    userData.users.some((user) => user.email === email);

  const createUser = (newUser, reset) => {
    if (checkEmailExists(newUser.email))
      return showPopUp(
        "User with this email already exists. Please use a different email.",
        "error"
      );

    apiCreateUser(newUser)
      .then(() => {
        fetchUsers();
        reset(EMPTY_FORM_VALUES);
        showPopUp("User created successfully", "check");
      })
      .catch((error) => {
        console.log(error);
        showPopUp("Error creating user", "error");
      })
      .finally(() => closeModal());
  };

  const deleteUser = (idUser) => {
    if (!userData.isLogged) {
      showPopUp("You must be logged in to delete the account.", "error");
      return;
    }

    if (idUser !== userData.userLogged.id) {
      showPopUp("You can't delete other users.", "error");
      return;
    }

    if (idUser === userData.userLogged.id) {
      apiDeleteUser(idUser)
        .then(() => {
          fetchUsers();
          showPopUp("User deleted successfully", "delete");
          setUserData((prevData) => ({
            ...prevData,
            isLogged: false,
          }));
        })
        .catch((error) => console.log(error))
        .finally(() => closeModal());
    }
  };

  const signInUser = (user) => {
    const { email, password } = user;
    const foundUser = userData.users.find((user) => user.email === email);

    if (foundUser) {
      if (foundUser.password === password) {
        setUserData((prevData) => ({
          ...prevData,
          isLogged: true,
          isShowingModal: false,
          userLogged: foundUser,
          isLoginUser: false,
        }));
        showPopUp("User successfully log in", "check");
      } else {
        setUserData((prevData) => ({
          ...prevData,
          isShowingPopUp: true,
        }));
        showPopUp("Incorrect password", "error");
      }
    } else {
      setUserData((prevData) => ({
        ...prevData,
        isShowingPopUp: true,
      }));
      showPopUp("User not found", "error");
    }
  };

  const handleClickUpdateUser = (user) => {
    if (!userData.isLogged) {
      showPopUp("You must be logged in to edit the account.", "error");
      return;
    }

    if (user.id === userData.userLogged.id) {
      setUserData((prevData) => ({
        ...prevData,
        isShowingModal: true,
        isUpdatingUser: user,
      }));
    } else {
      showPopUp("You can't edit other users.", "error");
    }
  };

  const updateUser = (userUpdated, reset) => {
    apiUpdateUser(userData.isUpdatingUser.id, userUpdated)
      .then(() => {
        fetchUsers();
        reset(EMPTY_FORM_VALUES);
        showPopUp("User updated successfully", "updated");
      })
      .catch((error) => console.log(error))
      .finally(() => {
        closeModal();
      });
  };

  const handleToggleModal = (modalType) => {
    setUserData((prevData) => ({
      ...prevData,
      isUpdatingUser: null,
    }));

    if (modalType === "login") {
      setUserData((prevData) => ({
        ...prevData,
        isLoginUser: true,
      }));
    }
    if (userData.isLoginUser) {
      setUserData((prevData) => ({
        ...prevData,
        isLoginUser: false,
      }));
    }
    setUserData((prevData) => ({
      ...prevData,
      isShowingModal: !prevData.isShowingModal,
    }));

    if (modalType === "logout") {
      setUserData((prevData) => ({
        ...prevData,
        isLogged: false,
      }));
      showPopUp("User successfully log out", "check");
      setUserData((prevData) => ({
        ...prevData,
        isShowingModal: false,
      }));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    ...userData,
    createUser,
    deleteUser,
    handleClickUpdateUser,
    updateUser,
    handleToggleModal,
    signInUser,
  };
};
