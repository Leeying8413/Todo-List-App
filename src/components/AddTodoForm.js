import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { IoAdd } from "react-icons/io5";
import "./AddTodoForm.css";

// 標籤、輸入框和新增按鈕
// 使用 Bootstrap 的 Form 組件確保 RWD 和基礎樣式
const AddTodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState("");

  // 處理表單提交：防止空值、去除前後空白
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo({
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        timestamp: new Date().getTime(),
        isDefault: false,
      });
      setInputValue("");
    }
  };

  return (
    <div className="form-wrapper">
      <Form.Label className="input-label">Add to list</Form.Label>
      <Form onSubmit={handleSubmit} className="add-todo-form">
        <InputGroup>
          <Form.Control
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="New task..."
            aria-label="Add task input"
            className="todo-input"
          />
          <div className="input-spacing"></div>
          <Button type="submit" className="add-button">
            <IoAdd size={24} />
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default AddTodoForm;
