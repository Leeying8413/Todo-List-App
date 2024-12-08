import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// 匯入組件
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import ProgressBar from "./components/ProgressBar";
import SwitchButton from "./components/SwitchButton";
import { TodoProvider } from "./context/TodoContext"; // 新增

const App = () => {
  return (
    <TodoProvider>
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
                  <ProgressBar />
                  <TodoList />
                  <div className="divider" />
                  <div className="switch-section">
                    <SwitchButton />
                  </div>
                  <AddTodoForm />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </TodoProvider>
  );
};

export default App;
