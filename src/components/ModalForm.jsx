import { useModalFormLogic } from "../Hooks/useModalFormLogic";
import { motion } from "framer-motion";
import { modalVariants } from "../shared/constants";
import FormSection from "./FormSection";
import Button from "./Button";

const ModalForm = ({
  isShowingModal,
  handleToggleModal,
  createUser,
  isUpdatingUser,
  updateUser,
  isLoginUser,
  signInUser,
}) => {
  const { formProps } = useModalFormLogic({
    isUpdatingUser,
    createUser,
    updateUser,
    isShowingModal,
    handleToggleModal,
    isLoginUser,
    signInUser,
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
        <Button onClick={handleToggleModal} iconButton={"/images/cross.png"} />

        <h2 className="text-4xl p-5 font-bold text-white">{formProps.title}</h2>

        <FormSection isLoginUser={isLoginUser} formProps={formProps} />

        <button className="bg-gray-800 hover:bg-gray-900 focus:outline-none focus:bg-gray-600 w-52 self-center rounded-lg p-2 text-white font-semibold transition duration-300 ease-in-out">
          {formProps.buttonText}
        </button>
      </form>
    </motion.section>
  );
};
export default ModalForm;
