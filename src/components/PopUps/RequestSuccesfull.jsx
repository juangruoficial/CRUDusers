import { motion } from "framer-motion";

const RequestSuccesfull = ({ messagePopUp, urlicon, isShowingPopUp }) => {
  const requestPopUpVariants = {
    hidden: { y: "500px", opacity: 0 },
    visible: {
      y: "-50%",
      x: "-50%",
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    isShowingPopUp && (
      <motion.section
        initial="hidden"
        animate="visible"
        variants={requestPopUpVariants}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-md shadow-lg p-6
        sm:w-72 md:w-96 lg:w-120 xl:w-160"
      >
        <article className="flex flex-col items-center space-y-4">
          <img className="w-20 h-20" src={urlicon} alt="" />
          <h1 className="text-lg font-semibold text-center">{messagePopUp}</h1>
        </article>
      </motion.section>
    )
  );
};

export default RequestSuccesfull;
