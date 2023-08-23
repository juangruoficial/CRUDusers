import TextInput from "./TextInput";
import { useModalFormLogic } from "../Hooks/useModalFormLogic";
import { motion } from "framer-motion";
import { modalVariants } from "../shared/constants";

const ModalForm = ({
  isShowingModal,
  handleToggleModal,
  createUser,
  isUpdatingUser,
  updateUser,
  isLoginUser,
  singInUser,
}) => {
  const { formProps } = useModalFormLogic({
    isUpdatingUser,
    createUser,
    updateUser,
    isShowingModal,
    handleToggleModal,
    isLoginUser,
    singInUser,
    omittedFields: isLoginUser ? ["first_name", "last_name", "birthday"] : [],
  });

  return (
    <motion.section
      initial="hidden"
      animate={isShowingModal ? "visible" : "hidden"}
      variants={modalVariants}
      className={` ${
        isShowingModal ? "visible" : "invisible"
      } h-full w-full bg-gray-600/75 fixed top-0 flex justify-center items-center p-6`}
    >
      <form
        onSubmit={formProps.handleSubmit}
        className="relative border rounded-lg bg-gray-700 border-blue-300 shadow-md p-5 flex flex-col gap-5 w-full sm:max-w-[800px]  "
      >
        <button
          type="button"
          onClick={handleToggleModal}
          className="w-6 absolute top-3 right-3"
        >
          <img className="w-[100%]" src="/images/cross.png" alt="" />
        </button>
        <h2 className="text-4xl p-5 font-bold text-white">{formProps.title}</h2>

        {!isLoginUser && (
          <>
            <TextInput
              type={"text"}
              urlIcon={"/images/user.png"}
              placeholder="First Name"
              id="first_name"
              registerProps={formProps.register("first_name", {
                required: "First name is required",
                maxLength: {
                  value: 20,
                  message: "First name is too long",
                },
              })}
              error={formProps.errors.first_name}
            />

            <TextInput
              type={"text"}
              placeholder={"Last Name"}
              id="last_name"
              registerProps={formProps.register("last_name", {
                required: "Last name is required",
                maxLength: {
                  value: 20,
                  message: "Last name is too long",
                },
              })}
              error={formProps.errors.last_name}
            />
            <TextInput
              type={"date"}
              placeholder="dd/mm/aaaa"
              urlIcon={"/images/birthday-cake.png"}
              id="birthday"
              registerProps={formProps.register("birthday", {
                required: "Birthday is required",
              })}
            />
          </>
        )}

        <TextInput
          type={"email"}
          urlIcon={"/images/email.png"}
          placeholder={"Example@gmail.com"}
          id="email"
          registerProps={formProps.register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email format",
            },
          })}
          error={formProps.errors.email}
        />

        <TextInput
          type="password"
          urlIcon="/images/lock.png"
          placeholder="Password"
          id="password"
          registerProps={formProps.register("password", {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message:
                "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
            },
          })}
          error={formProps.errors.password}
        />

        <button className="bg-gray-800 hover:bg-gray-900 focus:outline-none focus:bg-gray-600 w-52 self-center rounded-lg p-2 text-white font-semibold transition duration-300 ease-in-out">
          {formProps.buttonText}
        </button>
      </form>
    </motion.section>
  );
};
export default ModalForm;
