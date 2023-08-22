export const EMPTY_FORM_VALUES = {
  first_name: "",
  last_name: "",
  birth_date: "",
  email: "",
  password: "",
  image_url: "",
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
