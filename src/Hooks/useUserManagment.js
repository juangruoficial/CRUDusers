import { useState, useEffect } from "react";
import {
  getAllUsers,
  createUser as apiCreateUser,
  deleteUser as apiDeleteUser,
  updateUser as apiUpdateUser,
} from "../Services/apiFunctions.js";

import {
  EMPTY_FORM_VALUES,
  iconUrls,
  POP_UP_TYPES,
  MODAL_TYPES,
  ERROR_MESSAGES,
} from "../shared/constants.js";

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
      closePopUp();
    }, 2000);
  };

  const closePopUp = () => {
    setUserData((prevData) => ({
      ...prevData,
      isShowingPopUp: false,
    }));
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
      return showPopUp(ERROR_MESSAGES.USER_ALREADY_EXISTS, POP_UP_TYPES.ERROR);

    apiCreateUser(newUser)
      .then(() => {
        fetchUsers();
        reset(EMPTY_FORM_VALUES);
        showPopUp(ERROR_MESSAGES.USER_CREATED_SUCCESS, POP_UP_TYPES.CHECK);
      })
      .catch((error) => {
        console.log(error);
        showPopUp(ERROR_MESSAGES.ERROR_CREATING_USER, POP_UP_TYPES.ERROR);
      })
      .finally(() => closeModal());
  };

  const deleteUser = (idUser) => {
    if (!userData.isLogged) {
      showPopUp(ERROR_MESSAGES.MUST_BE_LOGGED_DELETE, POP_UP_TYPES.ERROR);
      return;
    }

    if (idUser !== userData.userLogged.id) {
      showPopUp(ERROR_MESSAGES.CANNOT_DELETE_OTHER_USERS, POP_UP_TYPES.ERROR);
      return;
    }

    if (idUser === userData.userLogged.id) {
      apiDeleteUser(idUser)
        .then(() => {
          fetchUsers();
          showPopUp(ERROR_MESSAGES.USER_DELETED_SUCCESS, POP_UP_TYPES.DELETE);
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
        loginUser(foundUser);
        showPopUp(ERROR_MESSAGES.USER_LOGGED_IN_SUCCESS, POP_UP_TYPES.CHECK);
      } else {
        showPopUp(ERROR_MESSAGES.INCORRECT_PASSWORD, POP_UP_TYPES.ERROR);
      }
    } else {
      showPopUp(ERROR_MESSAGES.USER_NOT_FOUND, POP_UP_TYPES.ERROR);
    }
  };

  const loginUser = (user) => {
    setUserData((prevData) => ({
      ...prevData,
      isLogged: true,
      isShowingModal: false,
      userLogged: user,
      isLoginUser: false,
      isShowingPopUp: false,
    }));
  };

  const handleClickUpdateUser = (user) => {
    if (!userData.isLogged) {
      showPopUp(ERROR_MESSAGES.MUST_BE_LOGGED_EDIT, POP_UP_TYPES.ERROR);
      return;
    }

    if (user.id === userData.userLogged.id) {
      setUserData((prevData) => ({
        ...prevData,
        isShowingModal: true,
        isUpdatingUser: user,
      }));
    } else {
      showPopUp(ERROR_MESSAGES.CANNOT_EDIT_OTHER_USERS, POP_UP_TYPES.ERROR);
    }
  };

  const updateUser = (userUpdated, reset) => {
    apiUpdateUser(userData.isUpdatingUser.id, userUpdated)
      .then(() => {
        fetchUsers();
        reset(EMPTY_FORM_VALUES);
        showPopUp(ERROR_MESSAGES.USER_UPDATED_SUCCESS, POP_UP_TYPES.UPDATED);
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
      showPopUp(ERROR_MESSAGES.USER_LOGGED_OUT_SUCCESS, POP_UP_TYPES.CHECK);
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
