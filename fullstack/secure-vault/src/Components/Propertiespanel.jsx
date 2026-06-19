import { useVault } from "../context/VaultContext";
import { File, Folder, X } from "lucide-react";

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

const PropertiesPanel = () => {
  const { selectedItem, selectItem } = useVault();

  if (!selectedItem) {
    return (
      <aside className="w-52 border-l border-white/10 bg-vault-dark flex-shrink-0 flex items-center justify-center">
        <p className="text-gray-500 text-xs text-center px-4">
          Select a file or folder to view properties
        </p>
      </aside>
    );
  }

  const isFolder = selectedItem.type === "folder";

  return (
    <aside className="w-52 border-l border-white/10 bg-vault-dark flex-shrink-0 p-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
          Properties
        </span>
        <button
          onClick={() => selectItem(null)}
          className="text-gray-500 hover:text-vault-cream transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 rounded-xl bg-vault-teal/20 flex items-center justify-center">
          {isFolder
            ? <Folder size={24} className="text-vault-accent" />
            : <File size={24} className="text-gray-400" />
          }
        </div>
      </div>

      {/* Name */}
      <p className="text-vault-cream text-sm font-medium text-center mb-6 break-all leading-snug">
        {selectedItem.name}
      </p>

      {/* Details */}
      <div className="space-y-4">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Type</p>
          <p className="text-sm text-gray-300">{getTypeLabel(selectedItem)}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Size</p>
          <p className="text-sm text-gray-300">
            {isFolder ? "—" : selectedItem.size || "—"}
          </p>
        </div>

        {isFolder && (
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Items</p>
            <p className="text-sm text-gray-300">
              {selectedItem.children?.length || 0} item(s)
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default PropertiesPanel;