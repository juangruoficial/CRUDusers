import React from "react";

const UserCard = ({ user, deleteUser, handleClickUpdateUser }) => {
  const defaultImage = "/images/user.png";
  return (
    <article className="grid gap-4 sm:gap-6 bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
      <header className="flex flex-col gap-2 sm:gap-3">
        <img
          className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full border-2 border-gray-500"
          src={user.image_url || defaultImage}
          alt=""
        />
        <h2 className="text-lg md:text-xl font-semibold text-center text-white">
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
        <button
          onClick={() => deleteUser(user.id)}
          className="p-2 w-24 bg-gray-700 text-white font-semibold rounded-md transition duration-300 ease-in-out hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
          <img
            className="w-[30px] h-[30px] mx-auto"
            src="/images/delete.png"
            alt=""
          />
        </button>
        <button
          onClick={() => handleClickUpdateUser(user)}
          className="p-2 w-24 bg-gray-700 text-white font-semibold rounded-md ml-2 transition duration-300 ease-in-out hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
          <img
            className="w-[30px] h-[30px] mx-auto"
            src="/images/pen.png"
            alt=""
          />
        </button>
      </div>
    </article>
  );
};

export default UserCard;
