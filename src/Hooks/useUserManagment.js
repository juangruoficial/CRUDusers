import { useState, useEffect } from "react";
import {
  getAllUsers,
  createUser as apiCreateUser,
  deleteUser as apiDeleteUser,
  updateUser as apiUpdateUser,
} from "../Services/apiFunctions.js";

import { EMPTY_FORM_VALUES } from "../shared/constants.js";

export const useUserManagement = () => {
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(null);
  const [users, setUsers] = useState([]);

  const createUser = (newUser, reset) => {
    apiCreateUser(newUser)
      .then(() => {
        getAllUsers().then(({ data }) => setUsers(data));
        reset(EMPTY_FORM_VALUES);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsShowingModal(false);
      });
  };

  const deleteUser = (idUser) => {
    apiDeleteUser(idUser)
      .then(() => getAllUsers().then(({ data }) => setUsers(data)))
      .catch((error) => console.log(error));
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
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsShowingModal(false);
      });
  };

  const handleToggleModal = () => {
    setIsShowingModal(!isShowingModal);
    setIsUpdatingUser(null);
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
  };
};
