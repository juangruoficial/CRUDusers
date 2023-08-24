import "./App.css";
import Header from "./components/Header";
import ModalForm from "./components/ModalForm";
import RequestSuccesfull from "./components/PopUps/RequestSuccesfull";
import UserList from "./components/UserList";
import { useUserManagement } from "./Hooks/useUserManagment";

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
    </div>
  );
}

export default App;
