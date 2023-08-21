const TextInput = ({
  label,
  id,
  registerProps,
  type,
  urlIcon,
  placeholder,
}) => {
  return (
    <section className="flex gap-5">
      <label className="self-center w-[20%] text-white flex flex-col">
        <span>{label}</span>
        <img className="mx-auto w-[30px] mt-1" src={urlIcon} alt="" />
      </label>
      <input
        className="w-[80%] p-2 rounded-lg outline-none bg-gray-800 text-white placeholder-gray-500 border-none shadow-sm"
        id={id}
        placeholder={placeholder}
        type={type}
        {...registerProps}
      />
    </section>
  );
};

export default TextInput;
