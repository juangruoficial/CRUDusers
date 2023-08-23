export const EMPTY_FORM_VALUES = {
  first_name: "",
  last_name: "",
  birth_date: "",
  email: "",
  password: "",
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
