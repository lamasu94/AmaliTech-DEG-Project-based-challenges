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

function highlightText(text, query) {
  if (!query) return <span>{text}</span>

  const parts = text.split(new RegExp(`(${query})`, 'gi'))
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark
            key={i}
            style={{
              background: '#2872A1',
              color: '#E8EDF0',
              borderRadius: 2,
              padding: '0 2px',
            }}
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  )
}

export default function Node({ node, isSelected, onSelect, onDragMove, searchQuery }) {
  const dragRef = useRef(null)
  const config = typeConfig[node.type] || typeConfig.question

  const isMatch = searchQuery &&
    node.text.toLowerCase().includes(searchQuery.toLowerCase())

  const isDimmed = searchQuery && !isMatch

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
      className={`node-card ${isSelected ? 'selected' : ''}`}
      style={{
        left: node.position.x,
        top: node.position.y,
        width: NODE_WIDTH,
        background: config.bg,
        border: isMatch
          ? '1px solid #CBDDE9'
          : isSelected
          ? '1px solid #2872A1'
          : config.border,
        borderRadius: 12,
        boxShadow: isMatch
          ? '0 0 0 3px rgba(203,221,233,0.2), 0 8px 32px rgba(40,114,161,0.3)'
          : undefined,
        opacity: isDimmed ? 0.25 : 1,
        transition: 'opacity 0.2s ease, box-shadow 0.2s ease, border 0.2s ease',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px 4px' }}>
        <span style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: isMatch ? '#CBDDE9' : config.dot,
          flexShrink: 0,
          display: 'inline-block',
          transition: 'background 0.2s',
        }} />
        <span style={{
          fontSize: 10,
          fontFamily: 'monospace',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: isMatch ? '#CBDDE9' : config.labelColor,
        }}>
          {config.label}
        </span>
        {isMatch && (
          <span style={{
            marginLeft: 'auto',
            fontSize: 9,
            fontFamily: 'monospace',
            color: '#CBDDE9',
            background: 'rgba(203,221,233,0.1)',
            padding: '2px 6px',
            borderRadius: 4,
          }}>
            match
          </span>
        )}
      </div>

      {/* Text */}
      <div style={{ padding: '4px 12px 10px' }}>
        <p style={{ fontSize: 13, color: '#E8EDF0', lineHeight: 1.4, fontWeight: 500 }}>
          {highlightText(node.text, searchQuery)}
        </p>
      </div>

      {/* Options */}
      {node.options && node.options.length > 0 && (
        <div style={{
          padding: '8px 12px 10px',
          borderTop: '1px solid #1E3F57',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}>
          {node.options.map((opt, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 11,
              color: '#8BA4B5',
            }}>
              <span style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#2872A1',
                flexShrink: 0,
                display: 'inline-block',
              }} />
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {highlightText(opt.label, searchQuery)}
              </span>
              <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#1E3F57' }}>
                →{opt.nextId}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* End badge */}
      {node.type === 'end' && (
        <div style={{ padding: '0 12px 10px' }}>
          <span style={{ fontSize: 10, color: '#8BA4B5', fontFamily: 'monospace' }}>
            ⊗ leaf node
          </span>
        </div>
      )}
    </div>
  )
}