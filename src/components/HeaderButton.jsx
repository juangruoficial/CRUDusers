const HeaderButton = ({ onClick, iconSrc, label }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-md transition duration-300 ease-in-out hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
    >
      <img className="w-6 h-6 md:w-8 md:h-8" src={iconSrc} alt="" />
      <p className="hidden sm:block">{label}</p>
    </button>
  );
};

export default HeaderButton;
