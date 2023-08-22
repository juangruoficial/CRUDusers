import { useState, useEffect } from "react";
import {
  getAllUsers,
  createUser as apiCreateUser,
  deleteUser as apiDeleteUser,
  updateUser as apiUpdateUser,
} from "../Services/apiFunctions.js";

import { EMPTY_FORM_VALUES } from "../shared/constants.js";

const iconCheck = "/images/check.png";
const icondelete = "/images/delete.png";
const iconUpdated = "/images/updated.png";
const iconError = "/images/close.png";

export const useUserManagement = () => {
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [urlicon, setUrlicon] = useState(false);
  const [isShowingPopUp, setIsShowingPopUp] = useState(false);
  const [messagePopUp, setMessagePopUp] = useState("");
  const [isLoginUser, setIsLoginUser] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const createUser = (newUser, reset) => {
    apiCreateUser(newUser)
      .then(() => {
        getAllUsers().then(({ data }) => setUsers(data));
        reset(EMPTY_FORM_VALUES);
        setIsShowingPopUp(true);
        setMessagePopUp("User created successfully");
        setUrlicon(iconCheck);
        setTimeout(() => {
          setIsShowingPopUp(false);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setIsShowingPopUp(true);
        setMessagePopUp("Error creating user");
        setUrlicon(iconError);
        setTimeout(() => {
          setIsShowingPopUp(false);
        }, 2000);
      })
      .finally(() => {
        setIsShowingModal(false);
      });
  };

  const deleteUser = (idUser) => {
    apiDeleteUser(idUser)
      .then(() =>
        getAllUsers().then(({ data }) => {
          setUsers(data);
          setIsShowingPopUp(true);
          setMessagePopUp("User deleted successfully");
          setUrlicon(icondelete);
          setTimeout(() => {
            setIsShowingPopUp(false);
          }, 2000);
        })
      )
      .catch((error) => console.log(error));
  };

  const singInUser = (user) => {
    const { email, password } = user;

    const foundUser = users.find((user) => user.email === email);

    if (foundUser) {
      if (foundUser.password === password) {
        setIsLogged(true);

        setIsShowingPopUp(true);
        setMessagePopUp("User successfully log in");
        setUrlicon(iconCheck);
        setTimeout(() => {
          setIsShowingPopUp(false);
        }, 2000);
      } else {
        setIsShowingPopUp(true);
        setMessagePopUp("Incorrect password");
        setUrlicon(icondelete);
        setTimeout(() => {
          setIsShowingPopUp(false);
        }, 2000);
      }
    } else {
      console.log("User not found");
    }
  };

  const handleClickUpdateUser = (user) => {
    setIsShowingModal(true);
    setIsUpdatingUser(user);
  };

  const updateUser = (userUpdated, reset) => {
    apiUpdateUser(isUpdatingUser.id, userUpdated)
      .then(() => {
        getAllUsers().then(({ data }) => setUsers(data));
        reset(EMPTY_FORM_VALUES);
        setIsShowingPopUp(true);
        setMessagePopUp("User updated successfully");
        setUrlicon(iconUpdated);
        setTimeout(() => {
          setIsShowingPopUp(false);
        }, 2000);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsShowingModal(false);
      });
  };

  const handleToggleModal = (modalType) => {
    setIsUpdatingUser(null);

    if (modalType === "login") {
      setIsLoginUser(true);
    } else if (isLoginUser) {
      setIsLoginUser(false);
    }

    // Cerrar el modal si el usuario ha iniciado sesión
    if (isLogged) {
      setIsLogged(false);
    } else {
      setIsShowingModal(!isShowingModal);
    }
  };

  useEffect(() => {
    getAllUsers().then(({ data }) => setUsers(data));
  }, []);

  return {
    isShowingModal,
    isUpdatingUser,
    users,
    createUser,
    deleteUser,
    handleClickUpdateUser,
    updateUser,
    handleToggleModal,
    urlicon,
    isShowingPopUp,
    messagePopUp,
    isLoginUser,
    singInUser,
    isLogged,
  };
};
