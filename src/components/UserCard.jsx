import React from "react";

const UserCard = ({ user, deleteUser, handleClickUpdateUser }) => {
  const defaultImage = "/images/user.png";
  return (
    <article className="grid gap-4 sm:gap-6 bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
      <header className="flex flex-col gap-2 sm:gap-3">
        <img
          className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full border-2 border-gray-500"
          src={user.image_url || defaultImage}
          alt=""
        />
        <h2 className="text-lg md:text-xl font-semibold text-center">
          {user.first_name} {user.last_name}
        </h2>
      </header>

      <p className="text-gray-600 mt-2">Email: {user.email}</p>
      <p className="text-gray-600">Birthdate: {user.birthday}</p>
      <div className="flex mt-4 justify-center sm:justify-start">
        <button
          onClick={() => deleteUser(user.id)}
          className="p-2 w-24 bg-red-600 text-white font-semibold rounded-md transition duration-300 ease-in-out hover:bg-red-700 focus:outline-none focus:bg-red-700"
        >
          Delete
        </button>
        <button
          onClick={() => handleClickUpdateUser(user)}
          className="p-2 w-24 bg-blue-600 text-white font-semibold rounded-md ml-2 transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
        >
          Edit
        </button>
      </div>
    </article>
  );
};

export default UserCard;
