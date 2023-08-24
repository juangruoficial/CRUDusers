const UserCardInfo = ({ user, randomNumber }) => {
  return (
    <>
      <header className="flex flex-col gap-5">
        <img
          className="w-40 h-30 mx-auto rounded-full border-8 border-white outline-dashed "
          src={`https://randomuser.me/api/portraits/med/men/${randomNumber}.jpg`}
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
    </>
  );
};
export default UserCardInfo;
