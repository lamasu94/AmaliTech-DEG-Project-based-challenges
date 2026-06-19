import { useEffect } from "react";

const useKeyboardNav = (items, selectedItem, selectItem, toggleFolder, expandedFolders, enterFolder) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!items || items.length === 0) return;

      const currentIndex = items.findIndex((i) => i.id === selectedItem?.id);

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        selectItem(items[nextIndex]);
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        selectItem(items[prevIndex]);
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (selectedItem?.type === "folder") {
          if (!expandedFolders[selectedItem.id]) {
            toggleFolder(selectedItem.id);
          } else {
            enterFolder(selectedItem);
          }
        }
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (selectedItem?.type === "folder" && expandedFolders[selectedItem.id]) {
          toggleFolder(selectedItem.id);
        }
      }

      if (e.key === "Enter") {
        e.preventDefault();
        if (selectedItem?.type === "folder") {
          enterFolder(selectedItem);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items, selectedItem, expandedFolders]);
};

export default useKeyboardNav;