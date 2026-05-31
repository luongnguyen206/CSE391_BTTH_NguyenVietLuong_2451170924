import React from "react";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            padding: "12px",
            margin: "5px 0",
            background: todo.done ? "#f0fff0" : "#fff",
            border: "1px solid #eee",
            borderRadius: "4px"
        }}>
            <input
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggle(todo.id)}
                style={{ marginRight: "10px"}}
            />
            <span style={{
                flex: 1,
                textDecoration: todo.done ? "line-through" : "none",
                color: todo.done ? "#999" : "#333"
            }}>
                {todo.text}
            </span>
            {/* Thêm ngày tạo */}
            <span style={{ fontSize: "15px", color: "#999", flex: 1}}>
                Ngày tạo: {new Date(todo.createAt).toLocaleDateString()}
            </span>
            <button
                onClick={() => onEdit(todo.id, prompt("Sửa công việc:", todo.text))}
                style={{
                    background: "#3498db",
                    color: "white",
                    border: "none",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginRight: "5px"
                }}>
                Sửa
            </button>
            <button
                onClick={() => onDelete(todo.id)}
                style={{
                    background: "#e74c3c",
                    color: "white",
                    border: "none",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
            >
                🗑
            </button>
        </div>
    );
}

export default TodoItem;