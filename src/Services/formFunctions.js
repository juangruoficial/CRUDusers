import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { EMPTY_FORM_VALUES } from "../shared/constants";

export const useModalForm = (
  isShowingModal,
  handleToggleModal,
  createUser,
  isUpdatingUser,
  updateUser
) => {
  const { handleSubmit, register, reset } = useForm();
  const title = isUpdatingUser ? "Update User" : "Create User";
  const buttonText = isUpdatingUser ? "Update" : "Create";

  const resetRef = useRef(reset);

  const submit = (data) => {
    isUpdatingUser
      ? updateUser(data, resetRef.current)
      : createUser(data, resetRef.current);

    console.log(data);
  };

  useEffect(() => {
    if (isUpdatingUser) reset(isUpdatingUser);
  }, [isUpdatingUser]);

  useEffect(() => {
    if (!isShowingModal) resetRef.current(EMPTY_FORM_VALUES);
  }, [isShowingModal]);

  return {
    handleSubmit,
    register,
    reset,
    title,
    buttonText,
    submit,
  };
};
