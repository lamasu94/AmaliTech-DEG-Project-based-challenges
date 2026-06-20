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

  function toggleMode() {
    setMode(prev => (prev === 'editor' ? 'preview' : 'editor'))
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
        />

        {/* Edit panel — only when a node is selected in editor mode */}
        {selectedNode && mode === 'editor' && (
          <EditPanel
            node={selectedNode}
            onUpdateText={updateNodeText}
            onUpdateOption={updateOptionLabel}
            onClose={deselectAll}
          />
        )}
      </div>

      {/* Preview mode — full screen overlay */}
      {mode === 'preview' && (
        <PreviewMode
          nodes={nodes}
          onExit={() => setMode('editor')}
        />
      )}
    </div>
  )
}