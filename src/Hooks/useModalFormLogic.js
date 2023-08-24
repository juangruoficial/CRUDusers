import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { EMPTY_FORM_VALUES } from "../shared/constants";

export function useModalFormLogic({
  isUpdatingUser,
  createUser,
  updateUser,
  isShowingModal,
  isLoginUser,
  omittedFields = [],
  signInUser,
}) {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const title = isUpdatingUser
    ? "Update User"
    : isLoginUser
    ? "Sing in"
    : "New User";

  const buttonText = isUpdatingUser
    ? "Update"
    : isLoginUser
    ? "Log in"
    : "Create";

  const resetRef = useRef(reset);

  const submit = (data) => {
    if (isLoginUser) {
      signInUser(data);
    } else if (isUpdatingUser) {
      updateUser(data, reset);
    } else {
      createUser(data, reset);
    }
  };

  useEffect(() => {
    if (isUpdatingUser) reset(isUpdatingUser);
  }, [isUpdatingUser]);

  useEffect(() => {
    if (!isShowingModal) resetRef.current(EMPTY_FORM_VALUES);
  }, [isShowingModal, isLoginUser]);

  const formProps = {
    handleSubmit: handleSubmit(submit),
    register: (name, options = {}) => {
      const isDisabled = isLoginUser && omittedFields.includes(name);
      return register(name, { ...options, disabled: isDisabled });
    },
    title,
    buttonText,
    resetRef,
    watch,
    errors,
  };

  return { formProps };
}
