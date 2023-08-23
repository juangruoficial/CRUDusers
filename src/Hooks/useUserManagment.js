import { useState, useEffect } from "react";
import {
  getAllUsers,
  createUser as apiCreateUser,
  deleteUser as apiDeleteUser,
  updateUser as apiUpdateUser,
} from "../Services/apiFunctions.js";

import { EMPTY_FORM_VALUES, iconUrls } from "../shared/constants.js";

export const useUserManagement = () => {
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [urlicon, setUrlicon] = useState(false);
  const [isShowingPopUp, setIsShowingPopUp] = useState(false);
  const [messagePopUp, setMessagePopUp] = useState("");
  const [isLoginUser, setIsLoginUser] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [userLogged, setUserLogged] = useState(null);

  const showPopUp = (message, icon) => {
    setIsShowingPopUp(true);
    setMessagePopUp(message);
    setUrlicon(iconUrls[icon]);
    setTimeout(() => {
      setIsShowingPopUp(false);
    }, 2000);
  };

  const closeModal = () => {
    setIsUpdatingUser(null);
    setIsShowingModal(false);
    setIsLoginUser(false);
  };

  const fetchUsers = () => {
    getAllUsers().then(({ data }) => setUsers(data));
  };
  const createUser = (newUser, reset) => {
    const emailExists = users.some((user) => user.email === newUser.email);

    if (emailExists) {
      showPopUp(
        "User with this email already exists. Please use a different email.",
        "error"
      );
      return;
    }

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
    if (isLogged) {
      if (idUser === userLogged.id) {
        apiDeleteUser(idUser)
          .then(() => {
            fetchUsers();
            showPopUp("User deleted successfully", "delete");
          })
          .catch((error) => console.log(error))
          .finally(() => closeModal());
      } else {
        showPopUp("You can't delete other users.", "error");
        return;
      }
    } else {
      showPopUp("You must be logged in to delete the account.", "error");
      return;
    }
  };

  const singInUser = (user) => {
    const { email, password } = user;
    const foundUser = users.find((user) => user.email === email);

    if (foundUser) {
      if (foundUser.password === password) {
        setIsLogged(true);
        setIsShowingModal(false);
        showPopUp("User successfully log in", "check");
        setUserLogged(foundUser);
      } else {
        setIsShowingPopUp(true);
        showPopUp("Incorrect password", "error");
      }
    } else {
      setIsShowingPopUp(true);
      showPopUp("User not found", "error");
    }
  };

  const handleClickUpdateUser = (user) => {
    if (isLogged) {
      if (user.id === userLogged.id) {
        setIsShowingModal(true);
        setIsUpdatingUser(user);
      } else {
        showPopUp("You can't edit other users.", "error");
        return;
      }
    } else {
      showPopUp("You must be logged in to edit the account.", "error");
      return;
    }
  };

  const updateUser = (userUpdated, reset) => {
    apiUpdateUser(isUpdatingUser.id, userUpdated)
      .then(() => {
        fetchUsers();
        reset(EMPTY_FORM_VALUES);
        showPopUp("User updated successfully", "updated");
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsShowingModal(false);
      });
  };

  const handleToggleModal = (modalType) => {
    setIsUpdatingUser(null);
    console.log("Isloged", isLogged, "isloginUser", isLoginUser);

    if (modalType === "login") {
      setIsLoginUser(true);
    }
    if (isLoginUser) setIsLoginUser(false);
    setIsShowingModal(!isShowingModal);

    if (modalType === "logout") {
      setIsLogged(false);
      showPopUp("User successfully log out", "check");
      setIsShowingModal(false);
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
    userLogged,
  };
};
