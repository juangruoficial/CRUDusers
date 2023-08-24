import { useState, useEffect } from "react";
import {
  getAllUsers,
  createUser as apiCreateUser,
  deleteUser as apiDeleteUser,
  updateUser as apiUpdateUser,
} from "../Services/apiFunctions.js";

import { EMPTY_FORM_VALUES, iconUrls } from "../shared/constants.js";

const POP_UP_TYPES = {
  ERROR: "error",
  CHECK: "check",
  DELETE: "delete",
  UPDATED: "updated",
};

const MODAL_TYPES = {
  LOGIN: "login",
  LOGOUT: "logout",
};

export const useUserManagement = () => {
  const initialUserData = {
    isShowingModal: false,
    isUpdatingUser: null,
    users: [],
    urlicon: false,
    isShowingPopUp: false,
    messagePopUp: "",
    isLoginUser: false,
    isLogged: false,
    userLogged: null,
  };

  const [userData, setUserData] = useState(initialUserData);

  const showPopUp = (message, popUpType) => {
    setUserData((prevData) => ({
      ...prevData,
      isShowingPopUp: true,
      messagePopUp: message,
      urlicon: iconUrls[popUpType],
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
        POP_UP_TYPES.ERROR
      );

    apiCreateUser(newUser)
      .then(() => {
        fetchUsers();
        reset(EMPTY_FORM_VALUES);
        showPopUp("User created successfully", POP_UP_TYPES.CHECK);
      })
      .catch((error) => {
        console.log(error);
        showPopUp("Error creating user", POP_UP_TYPES.ERROR);
      })
      .finally(() => closeModal());
  };

  const deleteUser = (idUser) => {
    if (!userData.isLogged) {
      showPopUp(
        "You must be logged in to delete the account.",
        POP_UP_TYPES.ERROR
      );
      return;
    }

    if (idUser !== userData.userLogged.id) {
      showPopUp("You can't delete other users.", POP_UP_TYPES.ERROR);
      return;
    }

    if (idUser === userData.userLogged.id) {
      apiDeleteUser(idUser)
        .then(() => {
          fetchUsers();
          showPopUp("User deleted successfully", POP_UP_TYPES.DELETE);
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
        showPopUp("User successfully log in", POP_UP_TYPES.CHECK);
      } else {
        setUserData((prevData) => ({
          ...prevData,
          isShowingPopUp: true,
        }));
        showPopUp("Incorrect password", POP_UP_TYPES.ERROR);
      }
    } else {
      setUserData((prevData) => ({
        ...prevData,
        isShowingPopUp: true,
      }));
      showPopUp("User not found", POP_UP_TYPES.ERROR);
    }
  };

  const handleClickUpdateUser = (user) => {
    if (!userData.isLogged) {
      showPopUp(
        "You must be logged in to edit the account.",
        POP_UP_TYPES.ERROR
      );
      return;
    }

    if (user.id === userData.userLogged.id) {
      setUserData((prevData) => ({
        ...prevData,
        isShowingModal: true,
        isUpdatingUser: user,
      }));
    } else {
      showPopUp("You can't edit other users.", POP_UP_TYPES.ERROR);
    }
  };

  const updateUser = (userUpdated, reset) => {
    apiUpdateUser(userData.isUpdatingUser.id, userUpdated)
      .then(() => {
        fetchUsers();
        reset(EMPTY_FORM_VALUES);
        showPopUp("User updated successfully", POP_UP_TYPES.UPDATED);
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

    if (modalType === MODAL_TYPES.LOGIN) {
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

    if (modalType === MODAL_TYPES.LOGOUT) {
      setUserData((prevData) => ({
        ...prevData,
        isLogged: false,
      }));
      showPopUp("User successfully log out", POP_UP_TYPES.CHECK);
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
