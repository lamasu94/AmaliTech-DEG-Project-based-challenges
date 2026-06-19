import { useVault } from "../context/VaultContext";
import useKeyboardNav from "../hooks/useKeyboardNav";
import { Folder, File, FileText, FileImage, FileSpreadsheet, ChevronRight } from "lucide-react";

const getFileIcon = (item) => {
  if (item.type === "folder") return <Folder size={15} className="text-vault-accent" />;
  const ext = item.name.split(".").pop().toLowerCase();
  if (ext === "pdf") return <FileText size={15} className="text-red-400" />;
  if (ext === "png" || ext === "jpg") return <FileImage size={15} className="text-orange-400" />;
  if (ext === "xlsx") return <FileSpreadsheet size={15} className="text-green-400" />;
  if (ext === "docx") return <FileText size={15} className="text-blue-400" />;
  return <File size={15} className="text-gray-400" />;
};

const getTypeLabel = (item) => {
  if (item.type === "folder") return "Folder";
  const ext = item.name.split(".").pop().toLowerCase();
  const map = {
    pdf: "PDF Document",
    docx: "Word Document",
    xlsx: "Excel Sheet",
    png: "Image",
    jpg: "Image",
    txt: "Text File",
    svg: "SVG File",
    yaml: "YAML Config",
    ttf: "Font File",
  };
  return map[ext] || "File";
};

const FileTable = () => {
  const {
    currentFolder,
    selectedItem,
    selectItem,
    toggleFolder,
    expandedFolders,
    breadcrumb,
    navigateTo,
    enterFolder,
    searchQuery,
  } = useVault();

  const items = currentFolder?.children || [];

  const filtered = searchQuery
    ? items.filter((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : items;

  const sorted = [...filtered].sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name);
    return a.type === "folder" ? -1 : 1;
  });

  useKeyboardNav(sorted, selectedItem, selectItem, toggleFolder, expandedFolders, enterFolder);

  const handleClick = (item) => {
    if (item.type === "folder") {
      enterFolder(item);
      toggleFolder(item.id);
    } else {
      selectItem(item);
    }
  };

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <Folder size={40} className="mb-3 opacity-30" />
        <p className="text-sm">
          {searchQuery ? "No results found" : "This folder is empty"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 px-4 py-3 text-xs text-gray-400 border-b border-white/10 flex-wrap">
        <span
          onClick={() => navigateTo(null, -1)}
          className="cursor-pointer hover:text-vault-cream transition-colors"
        >
          Root
        </span>
        {breadcrumb.map((crumb, index) => (
          <span key={crumb.id} className="flex items-center gap-1">
            <ChevronRight size={12} className="text-gray-600" />
            <span
              onClick={() => navigateTo(crumb, index)}
              className="cursor-pointer hover:text-vault-cream transition-colors"
            >
              {crumb.name}
            </span>
          </span>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-medium">Name</th>
              <th className="text-left px-4 py-3 font-medium">Type</th>
              <th className="text-left px-4 py-3 font-medium">Size</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <tr
                  key={item.id}
                  onClick={() => handleClick(item)}
                  className={`border-b border-white/5 cursor-pointer transition-colors
                    ${isSelected
                      ? "bg-vault-teal/30 text-vault-cream"
                      : "text-gray-300 hover:bg-white/5"
                    }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getFileIcon(item)}
                      <span className="truncate max-w-xs">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{getTypeLabel(item)}</td>
                  <td className="px-4 py-3 text-gray-400">
                    {item.type === "folder" ? "—" : item.size || "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileTable;