import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useUserManagement } from "./useUserManagment";

export const useModalForm = (
  isShowingModal,
  createUser,
  isUpdatingUser,
  isLoginUser,
  updateUser
) => {
  const { isLoginUser } = useUserManagement();
  const { handleSubmit, register, reset } = useForm();

  const resetRef = useRef(reset);

  const submit = (data) => {
    isUpdatingUser
      ? updateUser(data, resetRef.current)
      : createUser(data, resetRef.current);
  };

  return {
    handleSubmit,
    register,
    reset,
    submit,
  };
};
