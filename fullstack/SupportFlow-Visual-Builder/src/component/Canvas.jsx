import React, { useRef } from 'react'
import Node from './Node'
import Connections from './Connections'

export default function Canvas({ nodes, selectedId, onSelectNode, onDragMove, onDeselectAll, searchQuery }) {
  const canvasRef = useRef(null)

  function handleCanvasClick(e) {
    if (e.target === canvasRef.current) {
      onDeselectAll()
    }
  }

  return (
    <div style={{
      flex: 1,
      overflow: 'auto',
      position: 'relative',
    }}>
      <div
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{
          position: 'relative',
          minWidth: 1400,
          minHeight: 900,
          backgroundImage: `
            linear-gradient(rgba(40, 114, 161, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(40, 114, 161, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      >
        {/* SVG connectors */}
        <Connections nodes={nodes} />

        {/* Node cards */}
        {nodes.map(node => (
          <Node
            key={node.id}
            node={node}
            isSelected={selectedId === node.id}
            onSelect={onSelectNode}
            onDragMove={onDragMove}
            searchQuery={searchQuery}
          />
        ))}
      </div>
    </div>
  )
}