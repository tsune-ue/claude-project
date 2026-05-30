import { useState, useRef, useEffect, type KeyboardEvent } from 'react'
import type { Todo } from '../types/todo'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  function commitEdit() {
    if (editValue.trim()) {
      onEdit(todo.id, editValue)
    } else {
      setEditValue(todo.text)
    }
    setEditing(false)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') commitEdit()
    if (e.key === 'Escape') {
      setEditValue(todo.text)
      setEditing(false)
    }
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} ${editing ? 'editing' : ''}`}>
      {editing ? (
        <input
          ref={inputRef}
          className="todo-edit-input"
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitEdit}
        />
      ) : (
        <>
          <input
            type="checkbox"
            className="todo-checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <span
            className="todo-text"
            onDoubleClick={() => setEditing(true)}
          >
            {todo.text}
          </span>
          <button
            className="todo-delete-btn"
            onClick={() => onDelete(todo.id)}
            title="削除"
          >
            ✕
          </button>
        </>
      )}
    </li>
  )
}
