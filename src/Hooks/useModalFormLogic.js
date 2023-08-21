import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { EMPTY_FORM_VALUES } from "../shared/constants";

export function useModalFormLogic({
  isUpdatingUser,
  createUser,
  updateUser,
  isShowingModal,
}) {
  const { handleSubmit, register, reset, watch, formState } = useForm();
  const title = isUpdatingUser ? "Update User" : "New User";
  const buttonText = isUpdatingUser ? "Update" : "Create";

  const resetRef = useRef(reset);

  const submit = (data) => {
    isUpdatingUser ? updateUser(data, reset) : createUser(data, reset);
  };

  useEffect(() => {
    if (isUpdatingUser) reset(isUpdatingUser);
  }, [isUpdatingUser]);

  useEffect(() => {
    if (!isShowingModal) resetRef.current(EMPTY_FORM_VALUES);
  }, [isShowingModal]);

  const formProps = {
    handleSubmit: handleSubmit(submit),
    register,
    title,
    buttonText,
    resetRef,
    watch,
    formState,
  };

  return { formProps };
}
