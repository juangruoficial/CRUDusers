import UserCard from "./UserCard";

const UserList = ({ users, deleteUser, handleClickUpdateUser, imageUser }) => {
  return (
    <section className="w-[1240px] p-8 mt-32 grid mx-auto gap-10 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
      {users.map((user) => (
        <UserCard
          user={user}
          key={user.id}
          deleteUser={deleteUser}
          handleClickUpdateUser={handleClickUpdateUser}
        />
      ))}
    </section>
  );
};

export default UserList;
