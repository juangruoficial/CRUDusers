import "./App.css";
import Header from "./components/Header";
import ModalForm from "./components/ModalForm";
import UserList from "./components/UserList";
import { useUserManagement } from "./Hooks/useUserManagment";

function App() {
  const {
    isShowingModal,
    isUpdatingUser,
    users,
    createUser,
    deleteUser,
    handleClickUpdateUser,
    updateUser,
    handleToggleModal,
  } = useUserManagement();

  return (
    <div className="bg-gray-900 min-h-screen">
      <section className="flex">
        <Header handleToggleModal={handleToggleModal} />
        <UserList
          users={users}
          deleteUser={deleteUser}
          handleClickUpdateUser={handleClickUpdateUser}
        />
        <ModalForm
          isShowingModal={isShowingModal}
          isUpdatingUser={isUpdatingUser}
          handleToggleModal={handleToggleModal}
          createUser={createUser}
          updateUser={updateUser}
        />
      </section>
    </div>
  );
}

export default App;
