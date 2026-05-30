import type { FilterType } from '../types/todo'

interface Props {
  activeCount: number
  completedCount: number
  filter: FilterType
  onFilterChange: (f: FilterType) => void
  onClearCompleted: () => void
}

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'すべて' },
  { key: 'active', label: '未完了' },
  { key: 'completed', label: '完了済み' },
]

export function TodoFooter({ activeCount, completedCount, filter, onFilterChange, onClearCompleted }: Props) {
  return (
    <footer className="todo-footer">
      <span className="todo-count">
        残り <strong>{activeCount}</strong> 件
      </span>
      <nav className="todo-filters">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            className={`filter-btn ${filter === key ? 'active' : ''}`}
            onClick={() => onFilterChange(key)}
          >
            {label}
          </button>
        ))}
      </nav>
      {completedCount > 0 && (
        <button className="clear-completed-btn" onClick={onClearCompleted}>
          完了済みを削除
        </button>
      )}
    </footer>
  )
}
