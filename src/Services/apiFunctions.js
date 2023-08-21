import axios from "axios";

const BASE_URL = "https://users-crud.academlo.tech/";

export const getAllUsers = () => {
  return axios.get(BASE_URL + "users/");
};

export const createUser = (newUser) => {
  return axios.post(BASE_URL + "users/", newUser);
};

export const deleteUser = (idUser) => {
  return axios.delete(BASE_URL + `users/${idUser}/`);
};

export const updateUser = (userId, userUpdated) => {
  return axios.patch(BASE_URL + `users/${userId}/`, userUpdated);
};
