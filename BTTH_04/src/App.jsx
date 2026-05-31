import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import TodoItem from './components/TodoItem'
import TodoFilter from './components/TodoFilter'

function App() {
  // State chính (Tier 4)
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  // ===== Thêm todo (Tier 6) =====
  function addTodo() {
    if (inputValue.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      done: false,
      createAt: new Date().toISOString()
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  }

  // Xử lý phím Enter (Tier 5)
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      addTodo();
    }
  }

  // ===== Toggle done (Tier 6) =====
  function toggleTodo(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  }

  // ===== Xóa todo (Tier 6) =====
  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  // ===== Sửa todo =====
  function editTodo(id, newText) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  }

  // ===== Lọc todos (Tier 2) =====
  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.done;
    if (filter === "completed") return todo.done;
    return true;
  });

  // ===== Đếm số việc (Tier 2) =====
  const activeCount = todos.filter(todo => !todo.done).length;
  const completedCount = todos.filter(todo => todo.done).length;

  return (
    <>
      <div style={{
        maxWidth: "650px",
        margin: "50px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#4e4c4c",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
      }}>
        <h1 style={{ textAlign: "center" }}>📋 Todo List</h1>

        {/* Input (Tier 5) */}
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập công việc..."
            style={{
              flex: 1,
              padding: "10px",
              fontSize: "16px",
              border: "2px solid #ddd",
              borderRadius: "4px 0 0 4px",
              backgroundColor: "#fff",
              color: "#333"
            }}
          />
          <button
            onClick={addTodo}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              background: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "0 4px 4px 0",
              cursor: "pointer"
            }}
          >
            + Thêm
          </button>
        </div>

        {/* Filter (Tier 3) */}
        <TodoFilter
          filter={filter}
          setFilter={setFilter}
        />

        {/* Todo list (Tier 6) */}
        {filteredTodos.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "40px",
            color: "#999"
          }}>
            {todos.length === 0
              ? "📝 Chưa có công việc nào"
              : "Không có công việc phù hợp"}
          </div>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))
        )}

        {/* Footer (Tier 2) */}
        {todos.length > 0 && (
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "15px",
            padding: "10px",
            background: "#f9f9f9",
            borderRadius: "4px"
          }}>
            <span>{activeCount} việc chưa hoàn thành</span>
            {completedCount > 0 && (
              <span style={{ color: "#666" }}>
                {completedCount} việc đã xong
              </span>
            )}
          </div>
        )}
        <div style={{
          marginTop: "10px"
        }}>
          tổng số công việc: {todos.length}
        </div>
      </div>
    </>
  )
}

export default App
