# SecureVault — File Explorer

A modern, high-performance file explorer UI built for SecureVault Inc., designed for law firms and banks to navigate deeply nested secure documents with ease.

## Live Demo
https://amali-tech-deg-project-based-challe-lac.vercel.app/

## Design File
https://www.figma.com/design/NzObrV5n9DthH69MwxL40z/Amalitech-Secret-Vault?node-id=0-1&t=ZYHoyzxibGwyrRuN-1


---

## Tech Stack
- React (Vite)
- Tailwind CSS v4
- Lucide React (icons)

---

## Setup Instructions

1. Clone the repository
   git clone https://github.com/your-username/secure-vault.git

2. Navigate into the project
   cd secure-vault

3. Install dependencies
   npm install

4. Start the development server
   npm run dev

5. Open your browser at
   http://localhost:5173

---

### Project Structure
```
src/
├── assets/
├── Components/
│   ├── SideBar.jsx         
│   ├── Navbar.jsx          
│   ├── Filetable.jsx       
│   └── Propertiespanel.jsx 
├── Pages/
│   └── Dashboard.jsx      
├── context/
│   └── VaultContext.jsx  
└── hooks/
    └── useKeyboardNav.js  
```
---

## Recursive Strategy

The folder tree in the sidebar is built using a recursive React component called `TreeNode`.

Each `TreeNode` receives a node from the JSON data. If that node is a folder and is expanded, it maps over its `children` array and renders another `TreeNode` for each child — passing `depth + 1` to increase the indentation level.

This means the component can handle any depth of nesting without any changes to the code. Whether the data has 2 levels or 20 levels, the same component renders correctly because it calls itself until there are no more children to render.

---

## User Stories Implemented

### Story 1 — Recursive Tree
- Folder structure rendered from data.json
- Recursive TreeNode component handles unlimited depth
- Folders expand and collapse on click

### Story 2 — File Details & Inspection
- Clicking a file highlights it with a distinct visual state
- Properties Panel shows Name, Type, and Size from the JSON

### Story 3 — Keyboard Accessibility
- Arrow Up / Down moves between visible items
- Arrow Right expands a folder
- Arrow Left collapses a folder
- Enter navigates into a folder

### Story 4 — Wildcard Feature (Breadcrumb Navigation)
See below.

### Story 5 — Search & Filter
- Search bar in the navbar filters the current folder view in real time
- Results update instantly as the user types

---

## Wildcard Feature — Breadcrumb Navigation

### What it is
A breadcrumb trail displayed above the file table that shows the user's current location inside the folder structure, for example:

Root > 01_Legal_Department > Active_Cases > Doe_vs_MegaCorp_Inc

### Why I chose it
Law firms and banks deal with deeply nested folder structures. Without breadcrumbs, a user navigating 4 or 5 levels deep has no way to know where they are or jump back to a parent folder quickly.

The breadcrumb solves two real problems:
1. Orientation — the user always knows exactly where they are
2. Fast navigation — clicking any crumb jumps directly to that level without clicking back repeatedly

### Business value
For SecureVault's clients who manage thousands of legal case files, this feature reduces navigation time and prevents the common mistake of saving or moving files to the wrong folder — a critical error in a legal or banking context.

---

## Design Decisions
- No external component libraries used (no Bootstrap, Material UI, Chakra UI)
- All components built from scratch using Tailwind CSS utility classes
- Dark mode aesthetic throughout — cyber-secure, precise, fast
