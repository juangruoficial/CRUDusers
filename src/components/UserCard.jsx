import React from "react";
import { motion } from "framer-motion";
import {
  cardVariants,
  buttonHoverVariantsLeft,
  buttonHoverVariantsRight,
} from "../shared/constants";
import { randomNumber } from "../Services/randomNumber";

const UserCard = ({ user, deleteUser, handleClickUpdateUser }) => {
  return (
    <motion.article
      className="grid gap-5 sm:gap-5 bg-gray-800 p-10 sm:p-6 md:p-8 rounded-lg shadow-lg"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <header className="flex flex-col gap-5">
        <img
          className="w-40 h-30 mx-auto rounded-full border-8 border-white outline-dashed "
          src={`https://randomuser.me/api/portraits/med/men/${randomNumber(
            30
          )}.jpg`}
          alt=""
        />
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-white">
          {user.first_name} {user.last_name}
        </h2>
      </header>

      <p className="text-gray-400 mt-2 flex flex-col sm:flex-row gap-2 sm:items-center">
        <img
          className="w-[30px] h-[30px] inline-block"
          src="/images/email2.png"
          alt=""
        />
        <span className="text-sm text-gray-300">{user.email}</span>
      </p>
      <p className="text-gray-400 flex flex-col sm:flex-row gap-2 sm:items-center">
        <img
          className="w-[30px] h-[30px] inline-block"
          src="/images/birthday-cakec.png"
          alt=""
        />
        <span className="text-sm text-gray-300">{user.birthday}</span>
      </p>
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
