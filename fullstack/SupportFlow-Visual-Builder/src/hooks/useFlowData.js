import { useState, useCallback } from 'react'
import flowData from '../../flow_data.json'

export function useFlowData() {
  const [nodes, setNodes] = useState(
    flowData.nodes.map(n => ({ ...n, position: { ...n.position } }))
  )
  const [selectedId, setSelectedId] = useState(null)

  const selectedNode = nodes.find(n => n.id === selectedId) || null

  const updateNodeText = useCallback((id, newText) => {
    setNodes(prev =>
      prev.map(n => (n.id === id ? { ...n, text: newText } : n))
    )
  }, [])

  const updateNodePosition = useCallback((id, x, y) => {
    setNodes(prev =>
      prev.map(n => (n.id === id ? { ...n, position: { x, y } } : n))
    )
  }, [])

  const updateOptionLabel = useCallback((nodeId, optionIndex, newLabel) => {
    setNodes(prev =>
      prev.map(n => {
        if (n.id !== nodeId) return n
        const newOptions = n.options.map((opt, i) =>
          i === optionIndex ? { ...opt, label: newLabel } : opt
        )
        return { ...n, options: newOptions }
      })
    )
  }, [])

  const selectNode = useCallback((id) => {
    setSelectedId(id)
  }, [])

  const deselectAll = useCallback(() => {
    setSelectedId(null)
  }, [])

  const getNodeById = useCallback((id) => {
    return nodes.find(n => n.id === id) || null
  }, [nodes])

  return {
    nodes,
    selectedId,
    selectedNode,
    updateNodeText,
    updateNodePosition,
    updateOptionLabel,
    selectNode,
    deselectAll,
    getNodeById,
    meta: flowData.meta,
  }
}