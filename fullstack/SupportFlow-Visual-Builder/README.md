# SupportFlow Visual Builder

A visual decision tree editor for building and testing customer support chatbot flows. Built for the SupportFlow AI platform to replace error-prone spreadsheet-based bot configuration.

---
## figma prototype
https://www.figma.com/design/NzObrV5n9DthH69MwxL40z/Amalitech-Secret-Vault?node-id=23-71&t=MEyZpj8xdHfMhT0V-1
## Live Demo

🔗 https://amali-tech-deg-project-based-challe-omega.vercel.app/ 

---

## Overview

SupportFlow Visual Builder lets support managers design, edit, and test automated help bot conversation flows through an interactive flowchart interface — no spreadsheets, no guesswork.

The tool renders conversation logic as a connected node graph, allows real-time text editing, and includes a built-in chat simulator so teams can test the bot experience instantly before going live.

---

## Features

### 🗂 Visual Flow Editor
- Renders conversation nodes as draggable cards on an infinite canvas
- SVG bezier curves connect parent nodes to child nodes based on flow logic
- Color-coded node types: Start, Question, and End nodes are visually distinct
- Drag any node to reposition it on the canvas

###  Inline Node Editor
- Click any node to open the edit panel
- Edit question text and answer option labels in real time
- Changes reflect instantly on the canvas — no save button needed
- Displays node position coordinates and connection targets

###  Preview Mode (Bot Simulator)
- Toggle from editor view to a full-screen chat interface
- Simulates the real customer experience step by step
- Click through answer options to traverse the conversation tree
- Restart button appears when a leaf node (end of conversation) is reached

### ⌕ Search & Highlight *(Wildcard Feature)*
- Search bar in the toolbar filters nodes by text content in real time
- Matching nodes are highlighted with a light blue glow
- Non-matching nodes dim out so matches stand out instantly
- Matching text within node cards is highlighted inline
- Clear button resets the canvas instantly

---

## Wildcard Feature: Why Search & Highlight?

As a support team scales, their bot flows grow from 6 nodes to 60+. Finding a specific question or policy text buried in a large graph becomes painful without tooling.

Search & Highlight solves this by letting managers type any keyword — like "billing" or "technician" — and instantly see which nodes contain that text, without scrolling or clicking through every card. This directly reduces the time it takes to audit, update, or debug a flow, making the tool indispensable for larger teams.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS v4 |
| Graph rendering | Custom SVG (no libraries) |
| State management | React hooks (in-memory) |
| Font | Inter + JetBrains Mono |

> **No flowchart libraries were used.** Node positions, bezier curve paths, and SVG connector rendering are all computed manually from DOM coordinates.

> **No component libraries were used.** All UI components are custom-built.

---

## Project Structure

```
SupportFlow-Visual-Builder/
├── flow_data.json              # Bot flow data (source of truth)
├── src/
│   ├── App.jsx                 # Root component, state wiring
│   ├── main.jsx                # Entry point
│   ├── index.css               # Global styles + Tailwind
│   ├── hooks/
│   │   └── useFlowData.js      # Flow state management
│   └── component/
│       ├── Canvas.jsx          # Flowchart board
│       ├── Node.jsx            # Draggable node cards
│       ├── Connections.jsx     # SVG bezier connectors
│       ├── EditPanel.jsx       # Node edit sidebar
│       ├── PreviewMode.jsx     # Chat simulator
│       └── Toolbar.jsx         # Top bar + search
└── flow_data.json              # Conversation flow data
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Design System

| Token | Value | Usage |
|---|---|---|
| Primary Blue | `#2872A1` | Buttons, connectors, active states |
| Light Blue | `#CBDDE9` | Highlights, match indicators |
| Canvas Dark | `#0F1923` | Canvas background |
| Card Surface | `#152533` | Node card background |
| Muted | `#8BA4B5` | Secondary text, labels |
| Border | `#1E3F57` | Borders, dividers |
| Text | `#E8EDF0` | Primary text |

---

## How the SVG Connector Logic Works

Each connector is drawn as a cubic bezier curve computed from node positions:

```js
function bezierPath(x1, y1, x2, y2) {
  const dy = Math.abs(y2 - y1)
  const cp = Math.max(dy * 0.5, 60)
  return `M ${x1} ${y1} C ${x1} ${y1 + cp}, ${x2} ${y2 - cp}, ${x2} ${y2}`
}
```

The control points are derived from the vertical distance between nodes, creating smooth curves that adapt to any node layout without a graph library.

---

## Author

Built by [Lama Suleiman] as part of the AamliTech DEG Project-based challenge.
