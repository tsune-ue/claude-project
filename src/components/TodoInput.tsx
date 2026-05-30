import { useState, type KeyboardEvent } from 'react'

interface Props {
  onAdd: (text: string) => void
  onToggleAll: () => void
  hasItems: boolean
  allCompleted: boolean
}

export function TodoInput({ onAdd, onToggleAll, hasItems, allCompleted }: Props) {
  const [value, setValue] = useState('')

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      onAdd(value)
      setValue('')
    }
  }

  return (
    <div className="todo-input-row">
      {hasItems && (
        <button
          className={`toggle-all-btn ${allCompleted ? 'active' : ''}`}
          onClick={onToggleAll}
          title="すべて完了/未完了"
        >
          &#10003;
        </button>
      )}
      <input
        className="todo-input"
        type="text"
        placeholder="何をしますか？ Enterで追加"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </div>
  )
}
