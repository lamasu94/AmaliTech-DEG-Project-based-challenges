import SideBar from "../Components/SideBar";
import Navbar from "../Components/Navbar";
import FileTable from "../Components/Filetable";
import PropertiesPanel from "../Components/Propertiespanel";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-vault-dark">
      <SideBar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4">
            <FileTable />
          </main>
          <PropertiesPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;