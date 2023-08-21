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
      <label className="self-center  w-[20%]" htmlFor={id}>
        {label} <img className="mx-auto w-[30px]" src={urlIcon} alt="" />
      </label>
      <input
        className="w-[80%] p-2 rounded-lg outline-none bg-gray-200  itali "
        id={id}
        placeholder={placeholder}
        type={type}
        {...registerProps}
      />
    </section>
  );
};

export default TextInput;
