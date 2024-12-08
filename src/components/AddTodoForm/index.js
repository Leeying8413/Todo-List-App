import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { IoAdd } from "react-icons/io5";
import { useTodoContext } from "../../context/TodoContext";
import "./AddTodoForm.css";

// 新增待辦事項的表單組件
// 包含標題、輸入框和新增按鈕
const AddTodoForm = () => {
  const [inputValue, setInputValue] = useState("");
  const { handleAddTodo } = useTodoContext();

  // 處理表單提交：判斷空值和處理多餘空格
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleAddTodo(inputValue.trim());
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
