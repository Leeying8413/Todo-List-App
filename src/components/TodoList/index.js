import React from "react";
import { ListGroup, Form, Button } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { useTodoContext } from "../../context/TodoContext";
import "./TodoList.css";

// 顯示所有待辦事項的列表組件
// 每個項目包含勾選框和刪除按鈕
const TodoList = () => {
  const { getSortedTodos, handleToggle, handleDelete } = useTodoContext();
  const todos = getSortedTodos();

  // 若無待辦事項，則顯示空區塊
  if (todos?.length === 0) {
    return <div className="todo-list-wrapper empty-list"></div>;
  }

  return (
    <div className="todo-list-wrapper">
      <ListGroup>
        {todos.map((todo) => (
          // 待辦事項卡片
          <ListGroup.Item key={todo.id} className="todo-item">
            {/* 勾選區塊 */}
            <div className="todo-content">
              <Form.Check
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
                className="todo-checkbox"
              />
              {/* completed狀態會加上刪除線 */}
              <span
                className={`todo-text ${todo.completed ? "completed" : ""}`}
              >
                {todo.text}
              </span>
            </div>
            {/* 刪除按鈕 */}
            <Button
              variant="link"
              onClick={() => handleDelete(todo.id)}
              className="delete-button"
            >
              <IoClose />
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default TodoList;
