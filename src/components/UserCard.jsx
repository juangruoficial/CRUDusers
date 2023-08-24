import React from "react";
import { motion } from "framer-motion";
import {
  cardVariants,
  buttonHoverVariantsLeft,
  buttonHoverVariantsRight,
} from "../shared/constants";
import UserCardInfo from "./UserCardInfo";

const UserCard = ({
  user,
  deleteUser,
  handleClickUpdateUser,
  randomNumber,
}) => {
  return (
    <motion.article
      className="grid gap-5 sm:gap-5 bg-gray-800 p-10 sm:p-6 md:p-8 rounded-lg shadow-lg"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <UserCardInfo user={user} randomNumber={randomNumber} />
      <div className="flex mt-4 justify-center sm:justify-start">
        <motion.button
          onClick={() => deleteUser(user.id)}
          className="p-2 w-24 bg-gray-700 text-white font-semibold rounded-md transition duration-300 ease-in-out hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          whileHover="hover"
          variants={buttonHoverVariantsLeft}
        >
          <motion.img
            initial={{ x: 0 }}
            className="w-[30px] h-[30px] mx-auto"
            src="/images/delete.png"
            alt=""
          />
        </motion.button>
        <motion.button
          whileHover="hover"
          variants={buttonHoverVariantsRight}
          onClick={() => handleClickUpdateUser(user)}
          className="p-2 w-24 bg-gray-700 text-white font-semibold rounded-md ml-2 transition duration-300 ease-in-out hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
          <motion.img
            initial={{ x: 0 }}
            className="w-[30px] h-[30px] mx-auto"
            src="/images/pen.png"
            alt=""
          />
        </motion.button>
      </div>
    </motion.article>
  );
};

export default UserCard;
