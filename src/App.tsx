import { useTodos } from './hooks/useTodos'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'
import { TodoFooter } from './components/TodoFooter'

export default function App() {
  const {
    todos,
    allTodos,
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
  } = useTodos()

  const allCompleted = allTodos.length > 0 && allTodos.every(t => t.completed)

  return (
    <div className="app">
      <h1 className="app-title">Todo</h1>
      <div className="todo-card">
        <TodoInput
          onAdd={addTodo}
          onToggleAll={toggleAll}
          hasItems={allTodos.length > 0}
          allCompleted={allCompleted}
        />
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
        {allTodos.length > 0 && (
          <TodoFooter
            activeCount={activeCount}
            completedCount={completedCount}
            filter={filter}
            onFilterChange={setFilter}
            onClearCompleted={clearCompleted}
          />
        )}
      </div>
      <p className="hint">ダブルクリックでテキストを編集 · Enterで確定 · Escでキャンセル</p>
    </div>
  )
}
