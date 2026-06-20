import React, { useState } from 'react'

export default function PreviewMode({ nodes, onExit }) {
  const nodeMap = {}
  nodes.forEach(n => { nodeMap[n.id] = n })

  const startNode = nodes.find(n => n.type === 'start')

  const [history, setHistory] = useState([
    { role: 'bot', text: startNode?.text || 'Hello!' }
  ])
  const [currentNode, setCurrentNode] = useState(startNode)
  const [finished, setFinished] = useState(false)

  function handleOption(opt) {
    const nextNode = nodeMap[opt.nextId]
    if (!nextNode) return

    setHistory(prev => [
      ...prev,
      { role: 'user', text: opt.label },
      { role: 'bot', text: nextNode.text },
    ])
    setCurrentNode(nextNode)

    if (nextNode.type === 'end') {
      setFinished(true)
    }
  }

  function handleRestart() {
    setHistory([{ role: 'bot', text: startNode?.text || 'Hello!' }])
    setCurrentNode(startNode)
    setFinished(false)
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#0F1923',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 20px',
        borderBottom: '1px solid #1E3F57',
        background: '#0d1720',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#2872A1',
            animation: 'pulse 2s infinite',
          }} />
          <span style={{
            fontSize: 12,
            fontFamily: 'monospace',
            color: '#8BA4B5',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            Preview mode — test the bot
          </span>
        </div>
        <button
          onClick={onExit}
          style={{
            background: 'none',
            border: '1px solid #1E3F57',
            borderRadius: 8,
            padding: '6px 14px',
            fontSize: 12,
            color: '#8BA4B5',
            cursor: 'pointer',
            fontFamily: 'monospace',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            e.target.style.borderColor = '#2872A1'
            e.target.style.color = '#CBDDE9'
          }}
          onMouseLeave={e => {
            e.target.style.borderColor = '#1E3F57'
            e.target.style.color = '#8BA4B5'
          }}
        >
          ← Back to editor
        </button>
      </div>

      {/* Chat area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 560,
        width: '100%',
        margin: '0 auto',
        padding: '24px 16px',
        gap: 12,
      }}>
        {history.map((msg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            {msg.role === 'bot' && (
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: '#2872A1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                fontFamily: 'monospace',
                color: 'white',
                flexShrink: 0,
                marginRight: 8,
                marginTop: 2,
              }}>
                AI
              </div>
            )}
            <div style={{
              maxWidth: '80%',
              padding: '10px 14px',
              borderRadius: msg.role === 'bot' ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
              fontSize: 14,
              lineHeight: 1.5,
              background: msg.role === 'bot' ? '#152533' : '#2872A1',
              color: '#E8EDF0',
            }}>
              {msg.text}
            </div>
          </div>
        ))}

        {/* Options */}
        {!finished && currentNode?.options?.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 4 }}>
            <div style={{ marginLeft: 36, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ fontSize: 11, color: '#8BA4B5', fontFamily: 'monospace', marginBottom: 4 }}>
                Choose an option:
              </p>
              {currentNode.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleOption(opt)}
                  style={{
                    textAlign: 'left',
                    padding: '10px 16px',
                    borderRadius: 12,
                    border: '1px solid #2872A1',
                    background: 'transparent',
                    fontSize: 13,
                    color: '#CBDDE9',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = '#2872A1'
                    e.target.style.color = 'white'
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = 'transparent'
                    e.target.style.color = '#CBDDE9'
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* End state */}
        {finished && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            marginTop: 24,
            paddingTop: 24,
            borderTop: '1px solid #1E3F57',
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '1px solid #1E3F57',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8BA4B5',
              fontFamily: 'monospace',
            }}>
              ⊗
            </div>
            <p style={{ fontSize: 12, color: '#8BA4B5', fontFamily: 'monospace' }}>
              Conversation complete
            </p>
            <button
              onClick={handleRestart}
              style={{
                padding: '8px 20px',
                borderRadius: 8,
                border: 'none',
                background: '#2872A1',
                color: 'white',
                fontSize: 13,
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Restart conversation
            </button>
          </div>
        )}
      </div>
    </div>
  )
}