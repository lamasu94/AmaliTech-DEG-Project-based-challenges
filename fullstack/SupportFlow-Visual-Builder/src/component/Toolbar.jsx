import React from 'react'

export default function Toolbar({ mode, onToggleMode, selectedNode, nodeCount }) {
  const isPreview = mode === 'preview'

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      height: 52,
      background: '#0d1720',
      borderBottom: '1px solid #1E3F57',
      flexShrink: 0,
      zIndex: 10,
    }}>
      {/* Left: brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 26,
            height: 26,
            borderRadius: 6,
            background: '#2872A1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            fontFamily: 'monospace',
            fontWeight: 'bold',
            color: 'white',
          }}>
            SF
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#E8EDF0', letterSpacing: '-0.01em' }}>
            SupportFlow
          </span>
          <span style={{ fontSize: 12, color: '#1E3F57', fontFamily: 'monospace' }}>
            / Visual Builder
          </span>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 16, background: '#1E3F57' }} />

        {/* Stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, fontFamily: 'monospace', color: '#8BA4B5' }}>
          <span>{nodeCount} nodes</span>
          {selectedNode && (
            <>
              <span style={{ color: '#1E3F57' }}>·</span>
              <span style={{ color: '#CBDDE9' }}>editing node {selectedNode.id}</span>
            </>
          )}
        </div>
      </div>

      {/* Right: actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Mode badge */}
        <span style={{
          fontSize: 10,
          fontFamily: 'monospace',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          padding: '4px 8px',
          borderRadius: 6,
          border: `1px solid ${isPreview ? '#2872A1' : '#1E3F57'}`,
          color: isPreview ? '#2872A1' : '#8BA4B5',
          background: isPreview ? 'rgba(40,114,161,0.1)' : 'transparent',
        }}>
          {isPreview ? '● Preview' : '○ Editor'}
        </span>

        {/* Toggle button */}
        <button
          onClick={onToggleMode}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 16px',
            borderRadius: 8,
            border: 'none',
            background: isPreview ? '#1E3F57' : '#2872A1',
            color: isPreview ? '#CBDDE9' : 'white',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = isPreview ? '#2872A1' : '#1a5a8a'
            e.currentTarget.style.color = 'white'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = isPreview ? '#1E3F57' : '#2872A1'
            e.currentTarget.style.color = isPreview ? '#CBDDE9' : 'white'
          }}
        >
          <span style={{ fontSize: 11 }}>{isPreview ? '✎' : '▶'}</span>
          {isPreview ? 'Edit flow' : 'Test bot'}
        </button>
      </div>
    </div>
  )
}