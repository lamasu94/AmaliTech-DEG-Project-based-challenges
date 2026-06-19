import { createContext, useContext, useState } from "react";
import data from "../../data.json";

const VaultContext = createContext();

export const VaultProvider = ({ children }) => {
  const [expandedFolders, setExpandedFolders] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentFolder, setCurrentFolder] = useState({ name: "Root", children: data });
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFolder = (folderId) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    if (item?.type === "folder") {
      setCurrentFolder(item);
    }
  };

  const navigateTo = (folder, index) => {
    if (index === -1) {
      setBreadcrumb([]);
      setCurrentFolder({ name: "Root", children: data });
      setSelectedItem(null);
      return;
    }
    const newCrumb = breadcrumb.slice(0, index + 1);
    setBreadcrumb(newCrumb);
    setCurrentFolder(folder);
    setSelectedItem(folder);
  };

  const enterFolder = (folder) => {
    setBreadcrumb((prev) => [...prev, folder]);
    setCurrentFolder(folder);
    setSelectedItem(folder);
  };

  return (
    <VaultContext.Provider
      value={{
        data,
        expandedFolders,
        toggleFolder,
        selectedItem,
        selectItem,
        currentFolder,
        setCurrentFolder,
        breadcrumb,
        navigateTo,
        enterFolder,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </VaultContext.Provider>
  );
};

export const useVault = () => useContext(VaultContext);