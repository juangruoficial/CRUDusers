export const EMPTY_FORM_VALUES = {
  first_name: "",
  last_name: "",
  birth_date: "",
  email: "",
  password: "",
};

export const ERROR_MESSAGES = {
  USER_ALREADY_EXISTS:
    "User with this email already exists. Please use a different email.",
  USER_CREATED_SUCCESS: "User created successfully",
  ERROR_CREATING_USER: "Error creating user",
  MUST_BE_LOGGED_DELETE: "You must be logged in to delete the account.",
  CANNOT_DELETE_OTHER_USERS: "You can't delete other users.",
  USER_DELETED_SUCCESS: "User deleted successfully",
  USER_LOGGED_IN_SUCCESS: "User successfully log in",
  INCORRECT_PASSWORD: "Incorrect password",
  USER_NOT_FOUND: "User not found",
  MUST_BE_LOGGED_EDIT: "You must be logged in to edit the account.",
  CANNOT_EDIT_OTHER_USERS: "You can't edit other users.",
  USER_UPDATED_SUCCESS: "User updated successfully",
  USER_LOGGED_OUT_SUCCESS: "User successfully log out",
};

export const POP_UP_TYPES = {
  ERROR: "error",
  CHECK: "check",
  DELETE: "delete",
  UPDATED: "updated",
};

export const MODAL_TYPES = {
  LOGIN: "login",
  LOGOUT: "logout",
};

// variants animations

export const cardVariants = {
  hidden: { opacity: 0, rotateY: 90 },
  visible: { opacity: 1, rotateY: 0, transition: { duration: 0.5 } },
};
export const buttonHoverVariantsLeft = {
  hover: { x: -10, transition: { duration: 0.2 } },
};

export const buttonHoverVariantsRight = {
  hover: { x: 10, transition: { duration: 0.2 } },
};

export const modalVariants = {
  hidden: { opacity: 0, y: "-100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 10,
      stiffness: 100,
    },
  },
};

export const iconUrls = {
  check: "/images/check.png",
  delete: "/images/delete.png",
  updated: "/images/updated.png",
  error: "/images/close.png",
};
