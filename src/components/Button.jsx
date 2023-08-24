import React from "react";

const Button = ({ onClick, iconButton }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-6 absolute top-3 right-3"
    >
      <img className="w-[100%]" src={iconButton} alt="" />
    </button>
  );
};

export default Button;
