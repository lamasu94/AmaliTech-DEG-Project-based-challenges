import React, { useState } from 'react'
import { useFlowData } from './hooks/useFlowData'
import Toolbar from './component/Toolbar'
import Canvas from './component/Canvas'
import EditPanel from './component/EditPanel'
import PreviewMode from './component/PreviewMode'

export default function App() {
  const {
    nodes,
    selectedId,
    selectedNode,
    updateNodeText,
    updateNodePosition,
    updateOptionLabel,
    selectNode,
    deselectAll,
  } = useFlowData()

  const [mode, setMode] = useState('editor')
  const [searchQuery, setSearchQuery] = useState('')

  function toggleMode() {
    setMode(prev => (prev === 'editor' ? 'preview' : 'editor'))
    deselectAll()
    setSearchQuery('')
  }

  function handleSearch(query) {
    setSearchQuery(query)
    deselectAll()
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      background: '#0F1923',
    }}>
      {/* Top toolbar */}
      <Toolbar
        mode={mode}
        onToggleMode={toggleMode}
        selectedNode={selectedNode}
        nodeCount={nodes.length}
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />

      {/* Main area */}
      <div style={{
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Canvas */}
        <Canvas
          nodes={nodes}
          selectedId={selectedId}
          onSelectNode={selectNode}
          onDragMove={updateNodePosition}
          onDeselectAll={deselectAll}
          searchQuery={searchQuery}
        />

        {/* Edit panel */}
        {selectedNode && mode === 'editor' && (
          <EditPanel
            node={selectedNode}
            onUpdateText={updateNodeText}
            onUpdateOption={updateOptionLabel}
            onClose={deselectAll}
          />
        )}
      </div>

      {/* Preview mode */}
      {mode === 'preview' && (
        <PreviewMode
          nodes={nodes}
          onExit={() => setMode('editor')}
        />
      )}
    </div>
  )
}