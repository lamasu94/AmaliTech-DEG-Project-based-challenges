import React, { useState, useEffect } from 'react'

export default function EditPanel({ node, onUpdateText, onUpdateOption, onClose }) {
  const [textVal, setTextVal] = useState(node?.text || '')
  const [optionVals, setOptionVals] = useState(node?.options?.map(o => o.label) || [])

  useEffect(() => {
    setTextVal(node?.text || '')
    setOptionVals(node?.options?.map(o => o.label) || [])
  }, [node?.id])

  if (!node) return null

  function handleTextChange(e) {
    setTextVal(e.target.value)
    onUpdateText(node.id, e.target.value)
  }

  function handleOptionChange(i, val) {
    const next = [...optionVals]
    next[i] = val
    setOptionVals(next)
    onUpdateOption(node.id, i, val)
  }

  const typeColors = {
    start: '#2872A1',
    question: '#CBDDE9',
    end: '#8BA4B5',
  }

  return (
    <div style={{
      width: 280,
      flexShrink: 0,
      background: '#0d1720',
      borderLeft: '1px solid #1E3F57',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        borderBottom: '1px solid #1E3F57',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: typeColors[node.type],
            display: 'inline-block',
          }} />
          <span style={{
            fontSize: 11,
            fontFamily: 'monospace',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#8BA4B5',
          }}>
            {node.type} · node {node.id}
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#8BA4B5',
            fontSize: 20,
            cursor: 'pointer',
            lineHeight: 1,
            padding: '0 4px',
          }}
        >
          ×
        </button>
      </div>

      {/* Fields */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Node text */}
        <div>
          <label style={{
            display: 'block',
            fontSize: 11,
            fontFamily: 'monospace',
            color: '#8BA4B5',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 8,
          }}>
            Node text
          </label>
          <textarea
            value={textVal}
            onChange={handleTextChange}
            rows={4}
            style={{
              width: '100%',
              background: '#152533',
              border: '1px solid #1E3F57',
              borderRadius: 8,
              padding: '8px 12px',
              fontSize: 13,
              color: '#E8EDF0',
              resize: 'none',
              outline: 'none',
              fontFamily: 'Inter, sans-serif',
            }}
            onFocus={e => e.target.style.borderColor = '#2872A1'}
            onBlur={e => e.target.style.borderColor = '#1E3F57'}
          />
        </div>

        {/* Options */}
        {node.options && node.options.length > 0 && (
          <div>
            <label style={{
              display: 'block',
              fontSize: 11,
              fontFamily: 'monospace',
              color: '#8BA4B5',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 8,
            }}>
              Answer options
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {optionVals.map((label, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#2872A1', width: 16 }}>
                    {i + 1}.
                  </span>
                  <input
                    type="text"
                    value={label}
                    onChange={e => handleOptionChange(i, e.target.value)}
                    style={{
                      flex: 1,
                      background: '#152533',
                      border: '1px solid #1E3F57',
                      borderRadius: 8,
                      padding: '6px 10px',
                      fontSize: 12,
                      color: '#E8EDF0',
                      outline: 'none',
                      fontFamily: 'Inter, sans-serif',
                    }}
                    onFocus={e => e.target.style.borderColor = '#2872A1'}
                    onBlur={e => e.target.style.borderColor = '#1E3F57'}
                  />
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#1E3F57' }}>
                    →{node.options[i].nextId}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* End node info */}
        {node.type === 'end' && (
          <div style={{
            background: '#152533',
            border: '1px solid #1A3A4A',
            borderRadius: 8,
            padding: '10px 12px',
          }}>
            <p style={{ fontSize: 11, color: '#8BA4B5', fontFamily: 'monospace' }}>
              ⊗ This is a leaf node — the conversation ends here.
            </p>
          </div>
        )}

        {/* Position info */}
        <div style={{ borderTop: '1px solid #1E3F57', paddingTop: 16 }}>
          <p style={{ fontSize: 10, fontFamily: 'monospace', color: '#1E3F57', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
            Position
          </p>
          <p style={{ fontSize: 11, fontFamily: 'monospace', color: '#8BA4B5' }}>
            x: {Math.round(node.position.x)} · y: {Math.round(node.position.y)}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '10px 16px', borderTop: '1px solid #1E3F57' }}>
        <p style={{ fontSize: 10, fontFamily: 'monospace', color: '#1E3F57' }}>
          Changes apply instantly to the canvas
        </p>
      </div>
    </div>
  )
}