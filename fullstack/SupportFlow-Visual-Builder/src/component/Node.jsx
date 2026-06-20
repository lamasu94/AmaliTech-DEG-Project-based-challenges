import React, { useRef } from 'react'

const NODE_WIDTH = 220

const typeConfig = {
  start: {
    label: 'START',
    labelColor: '#2872A1',
    border: '1px solid #2872A1',
    bg: 'linear-gradient(135deg, #152533 0%, #1a3347 100%)',
    dot: '#2872A1',
  },
  question: {
    label: 'QUESTION',
    labelColor: '#CBDDE9',
    border: '1px solid #1E3F57',
    bg: '#152533',
    dot: '#CBDDE9',
  },
  end: {
    label: 'END',
    labelColor: '#8BA4B5',
    border: '1px solid #1A3A4A',
    bg: '#111e2a',
    dot: '#8BA4B5',
  },
}

export default function Node({ node, isSelected, onSelect, onDragMove }) {
  const dragRef = useRef(null)
  const config = typeConfig[node.type] || typeConfig.question

  function handleMouseDown(e) {
    if (e.target.closest('button')) return
    e.preventDefault()
    onSelect(node.id)

    const startX = e.clientX - node.position.x
    const startY = e.clientY - node.position.y

    function onMouseMove(ev) {
      onDragMove(node.id, ev.clientX - startX, ev.clientY - startY)
    }

    function onMouseUp() {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  return (
    <div
      ref={dragRef}
      onMouseDown={handleMouseDown}
      className={`node-card rounded-xl shadow-lg ${isSelected ? 'selected' : ''}`}
      style={{
        left: node.position.x,
        top: node.position.y,
        width: NODE_WIDTH,
        background: config.bg,
        border: isSelected ? '1px solid #2872A1' : config.border,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px 4px' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: config.dot, flexShrink: 0, display: 'inline-block' }} />
        <span style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase', color: config.labelColor }}>
          {config.label}
        </span>
      </div>

      {/* Text */}
      <div style={{ padding: '4px 12px 10px' }}>
        <p style={{ fontSize: 13, color: '#E8EDF0', lineHeight: 1.4, fontWeight: 500 }}>
          {node.text}
        </p>
      </div>

      {/* Options */}
      {node.options && node.options.length > 0 && (
        <div style={{ padding: '8px 12px 10px', borderTop: '1px solid #1E3F57', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {node.options.map((opt, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#8BA4B5' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2872A1', flexShrink: 0, display: 'inline-block' }} />
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{opt.label}</span>
              <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#1E3F57' }}>→{opt.nextId}</span>
            </div>
          ))}
        </div>
      )}

      {/* End badge */}
      {node.type === 'end' && (
        <div style={{ padding: '0 12px 10px' }}>
          <span style={{ fontSize: 10, color: '#8BA4B5', fontFamily: 'monospace' }}>⊗ leaf node</span>
        </div>
      )}
    </div>
  )
}