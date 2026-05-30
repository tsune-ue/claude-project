import { useState, useEffect, useCallback } from 'react'
import type { Todo, FilterType } from '../types/todo'

const STORAGE_KEY = 'todos'

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Todo[]) : []
  } catch {
    return []
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)
  const [filter, setFilter] = useState<FilterType>('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = useCallback((text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos(prev => [
      { id: generateId(), text: trimmed, completed: false, createdAt: Date.now() },
      ...prev,
    ])
  }, [])

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }, [])

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }, [])

  const editTodo = useCallback((id: string, text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, text: trimmed } : t)))
  }, [])

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(t => !t.completed))
  }, [])

  const toggleAll = useCallback(() => {
    setTodos(prev => {
      const allDone = prev.every(t => t.completed)
      return prev.map(t => ({ ...t, completed: !allDone }))
    })
  }, [])

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const activeCount = todos.filter(t => !t.completed).length
  const completedCount = todos.filter(t => t.completed).length

  return {
    todos: filtered,
    allTodos: todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    activeCount,
    completedCount,
  }
}
