import React from 'react'

const NODE_WIDTH = 220
const NODE_HEIGHT = 90

function getNodeBottom(node) {
  return {
    x: node.position.x + NODE_WIDTH / 2,
    y: node.position.y + NODE_HEIGHT,
  }
}

function getNodeTop(node) {
  return {
    x: node.position.x + NODE_WIDTH / 2,
    y: node.position.y,
  }
}

function bezierPath(x1, y1, x2, y2) {
  const dy = Math.abs(y2 - y1)
  const cp = Math.max(dy * 0.5, 60)
  return `M ${x1} ${y1} C ${x1} ${y1 + cp}, ${x2} ${y2 - cp}, ${x2} ${y2}`
}

export default function Connections({ nodes }) {
  const nodeMap = {}
  nodes.forEach(n => { nodeMap[n.id] = n })

  const connections = []

  nodes.forEach(node => {
    if (!node.options) return
    node.options.forEach((opt, i) => {
      const target = nodeMap[opt.nextId]
      if (!target) return

      const from = getNodeBottom(node)
      const to = getNodeTop(target)
      const path = bezierPath(from.x, from.y, to.x, to.y)

      const mx = (from.x + to.x) / 2
      const my = (from.y + to.y) / 2

      connections.push({
        path,
        label: opt.label,
        mx,
        my,
        key: `${node.id}-${opt.nextId}-${i}`,
      })
    })
  })

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L8,3 z" fill="#2872A1" />
        </marker>
      </defs>

      {connections.map(({ path, label, mx, my, key }) => (
        <g key={key}>
          {/* Shadow */}
          <path
            d={path}
            fill="none"
            stroke="#0F1923"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Line */}
          <path
            d={path}
            fill="none"
            stroke="#2872A1"
            strokeWidth="1.5"
            strokeLinecap="round"
            markerEnd="url(#arrowhead)"
            opacity="0.7"
          />
          {/* Label background */}
          <rect
            x={mx - 44}
            y={my - 10}
            width="88"
            height="18"
            rx="4"
            fill="#0F1923"
            opacity="0.9"
          />
          {/* Label text */}
          <text
            x={mx}
            y={my + 4}
            textAnchor="middle"
            fontSize="10"
            fontFamily="Inter, sans-serif"
            fill="#8BA4B5"
          >
            {label.length > 16 ? label.slice(0, 15) + '…' : label}
          </text>
        </g>
      ))}
    </svg>
  )
}