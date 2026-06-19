import { Search, Bell } from "lucide-react";
import { useVault } from "../context/VaultContext";
import maleAvatar from "../assets/maleAvatar.svg";

const Navbar = () => {
  const { searchQuery, setSearchQuery, currentFolder } = useVault();

  return (
    <nav className="h-14 bg-vault-dark border-b border-white/10 flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-2">
        <span className="text-vault-cream font-medium text-sm">
          ☰ {currentFolder?.name || "Root"}
        </span>
      </div>

      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-md px-3 py-1.5 w-64">
        <Search size={14} className="text-gray-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search any document..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent text-sm text-vault-cream placeholder-gray-500 outline-none w-full"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell size={18} className="text-gray-400 cursor-pointer hover:text-vault-cream" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-vault-accent rounded-full" />
        </div>
        <img
          src={maleAvatar}
          alt="User avatar"
          className="w-8 h-8 rounded-full border border-white/20 object-cover"
        />
      </div>
    </nav>
  );
};

export default Navbar;