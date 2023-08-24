import "./App.css";
import Header from "./components/Header";
import ModalForm from "./components/ModalForm";
import Err404PopUp from "./components/PopUps/Err404PopUp";
import RequestSuccesfull from "./components/PopUps/RequestSuccesfull";
import UserList from "./components/UserList";
import { useUserManagement } from "./Hooks/useUserManagment";
import { motion } from "framer-motion";
function App() {
  const userManagementProps = useUserManagement();

  return (
    <div className="bg-gray-900 min-h-screen">
      <section className="flex">
        <Header {...userManagementProps} />
        <UserList {...userManagementProps} />

        <ModalForm {...userManagementProps} />
        <RequestSuccesfull {...userManagementProps} />
      </section>
      {userManagementProps.isFetchingUsers && (
        <motion.div
          className="fixed flex-col gap-12 top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-white">Waiting for Answer from API...</p>
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500"></div>
          </div>
        </motion.div>
      )}

      {userManagementProps.isActiveError404 && <Err404PopUp />}
    </div>
  );
}

export default App;
