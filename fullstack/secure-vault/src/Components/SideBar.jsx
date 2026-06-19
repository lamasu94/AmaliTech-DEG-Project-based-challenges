import { useVault } from "../context/VaultContext";
import { ChevronRight, Folder, FolderOpen, File } from "lucide-react";

const TreeNode = ({ node, depth = 0 }) => {
  const { expandedFolders, toggleFolder, selectedItem, selectItem } = useVault();
  const isExpanded = expandedFolders[node.id];
  const isSelected = selectedItem?.id === node.id;
  const isFolder = node.type === "folder";

  const handleClick = () => {
    if (isFolder) toggleFolder(node.id);
    selectItem(node);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        style={{ paddingLeft: `${depth * 12 + 12}px` }}
        className={`flex items-center gap-2 py-1.5 pr-3 cursor-pointer rounded-md mx-2 text-sm
          ${isSelected
            ? "bg-vault-teal text-vault-cream"
            : "text-gray-400 hover:bg-white/5 hover:text-vault-cream"
          }`}
      >
        {isFolder && (
          <ChevronRight
            size={14}
            className={`transition-transform duration-200 flex-shrink-0 ${isExpanded ? "rotate-90" : ""}`}
          />
        )}
        {!isFolder && <span className="w-[14px]" />}

        {isFolder ? (
          isExpanded ? (
            <FolderOpen size={15} className="text-vault-accent flex-shrink-0" />
          ) : (
            <Folder size={15} className="text-vault-accent flex-shrink-0" />
          )
        ) : (
          <File size={15} className="text-gray-500 flex-shrink-0" />
        )}

        <span className="truncate">{node.name}</span>
      </div>

      {isFolder && isExpanded && node.children?.length > 0 && (
        <div>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const SideBar = () => {
  const { data } = useVault();

  return (
    <aside className="w-56 bg-vault-dark flex flex-col h-screen border-r border-white/10 flex-shrink-0">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-white/10">
        <h1 className="text-vault-cream font-semibold text-base tracking-wide">
           SecureVault
        </h1>
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto py-3 space-y-0.5">
        {data.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </div>

      {/* Storage */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>Storage</span>
          <span>62 / 100 GB</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
          <div className="h-full w-[62%] bg-vault-accent rounded-full" />
        </div>
        <button className="w-full bg-vault-accent hover:opacity-90 text-white text-sm py-2 rounded-md transition-opacity">
          Logout →
        </button>
      </div>
    </aside>
  );
};

export default SideBar;