import TextInput from "./TextInput";
import { useModalFormLogic } from "../Hooks/useModalFormLogic";

const ModalForm = ({
  isShowingModal,
  handleToggleModal,
  createUser,
  isUpdatingUser,
  updateUser,
}) => {
  const { formProps } = useModalFormLogic({
    isUpdatingUser,
    createUser,
    updateUser,
    isShowingModal,
    handleToggleModal,
  });

  return (
    <section
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

        <TextInput
          type={"text"}
          urlIcon={"/images/user.png"}
          placeholder="First Name"
          id="first_name"
          registerProps={formProps.register("first_name", {
            required: true,
            maxLength: 20,
          })}
        />

        <TextInput
          type={"text"}
          placeholder={"Last Name"}
          id="last_name"
          registerProps={formProps.register("last_name", {
            required: true,
            maxLength: 20,
          })}
        />

        <TextInput
          type={"text"}
          urlIcon={"/images/email.png"}
          placeholder={"Example@gmail.com"}
          id="email"
          registerProps={formProps.register("email", { required: true })}
        />

        <TextInput
          type={"date"}
          placeholder="dd/mm/aaaa"
          urlIcon={"/images/birthday-cake.png"}
          id="birthday"
          registerProps={formProps.register("birthday", { required: true })}
        />

        <TextInput
          type={"password"}
          urlIcon={"/images/lock.png"}
          placeholder={"Password"}
          id="password"
          registerProps={formProps.register("password", { required: true })}
        />

        <TextInput
          type={"text"}
          urlIcon={"/images/image.png"}
          placeholder={"Add an image URL here"}
          id="image_url"
          registerProps={formProps.register("image_url", { required: true })}
        />

        <button className="bg-gray-800 hover:bg-gray-900 focus:outline-none focus:bg-gray-700 w-52 self-center rounded-lg p-2 text-white font-semibold transition duration-300 ease-in-out">
          {formProps.buttonText}
        </button>
      </form>
    </section>
  );
};
export default ModalForm;
