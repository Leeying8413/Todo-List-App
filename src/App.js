import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Swal from "sweetalert2";

// 匯入組件
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import ProgressBar from "./components/ProgressBar";
import SwitchButton from "./components/SwitchButton";

// 預設待辦事項
const defaultTodos = [
  {
    id: 1,
    text: "寫點什麼吧！點擊左側可以勾選完成",
    completed: false,
    timestamp: Date.now() - 300,
    isDefault: true, // 控制用標記
  },
  {
    id: 2,
    text: "點擊右側的 X 可以刪除事項",
    completed: false,
    timestamp: Date.now() - 200,
    isDefault: true,
  },
  {
    id: 3,
    text: "讓我們開始充滿效率的一天！✨",
    completed: false,
    timestamp: Date.now() - 100,
    isDefault: true,
  },
];

const App = () => {
  // 使用useState Hook管理待辦事項列表，帶入預設值
  const [todos, setTodos] = useState(defaultTodos);

  // 切換鈕狀態（控制已完成事項是or否排在最下方）
  const [sortCompleted, setSortCompleted] = useState(false);

  // 處理新增待辦事項
  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  // 處理待辦事項的勾選狀態
  const handleToggle = (todoId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 刪除待辦事項
  const handleDelete = (todoId) => {
    // 檢查是否為預設待辦事項
    const todoToDelete = todos.find((todo) => todo.id === todoId);

    // 預設的直接刪
    if (todoToDelete.isDefault) {
      setTodos(todos.filter((todo) => todo.id !== todoId));
      return;
    }
    // 不是預設的就跳出甜吐司確認
    Swal.fire({
      title: "確定要刪除嗎？",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545cc",
      cancelButtonColor: "#788fd4",
      confirmButtonText: "刪除",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        setTodos(todos.filter((todo) => todo.id !== todoId));
      }
    });
  };

  // 處理排序切換
  const handleSort = (checked) => {
    setSortCompleted(checked);
    // 如果開啟切換，就移除所有預設事項
    if (checked) {
      setTodos(todos.filter((todo) => !todo.isDefault));
    }
  };

  // 排序並渲染待辦事項
  const getSortedTodos = () => {
    if (!sortCompleted) return todos;

    return [...todos].sort((a, b) => {
      // 依照完成狀態排序
      if (!a.completed && b.completed) return -1;
      if (a.completed && !b.completed) return 1;

      // 依照時間排序
      return b.timestamp - a.timestamp;
    });
  };

  return (
    <div className="main-container">
      <Container fluid>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col xs={12} sm={8} md={6} lg={5} xl={4}>
            <Card className="todo-card">
              <Card.Body>
                <div className="title-section">
                  <h1 className="main-title">Todo List</h1>
                  <p className="subtitle">Add things to do</p>
                </div>
                <div className="divider" />
                <ProgressBar todos={todos} />
                <TodoList
                  todos={getSortedTodos()}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
                <div className="divider" />
                <div className="switch-section">
                  <SwitchButton
                    sortCompleted={sortCompleted}
                    onToggle={handleSort}
                  />
                </div>
                <AddTodoForm onAddTodo={handleAddTodo} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
