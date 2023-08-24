import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { randomNumber } from "../Services/randomNumber";

const UserList = ({ users, deleteUser, handleClickUpdateUser, imageUser }) => {
  const [initialRandomNumber, setInitialRandomNumber] = useState(null);

  useEffect(() => {
    setInitialRandomNumber(randomNumber(50));
  }, []);

  return (
    <section className="w-[1240px] p-8 mt-32 grid mx-auto gap-10 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
      {users.map((user) => (
        <UserCard
          user={user}
          key={user.id}
          deleteUser={deleteUser}
          handleClickUpdateUser={handleClickUpdateUser}
          randomNumber={initialRandomNumber}
        />
      ))}
    </section>
  );
};

export default UserList;
