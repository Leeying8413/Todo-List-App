import { useState, useCallback } from "react";
import { todoService } from "../services/todo-service";
import Swal from "sweetalert2";

export const useTodos = () => {
  const [todos, setTodos] = useState(todoService.getTodos());
  const [sortCompleted, setSortCompleted] = useState(false);

  // try-catch
  const saveTodosWithError = useCallback(async (newTodos) => {
    try {
      await todoService.saveTodos(newTodos);
      setTodos(newTodos);
    } catch (error) {
      Swal.fire("錯誤", error.message, "error");
    }
  }, []);

  const addTodo = useCallback(
    async (newTodo) => {
      const updatedTodos = [...todos, newTodo];
      await saveTodosWithError(updatedTodos);
    },
    [todos]
  );

  const deleteTodo = useCallback(
    async (todoId) => {
      const todoToDelete = todos.find((todo) => todo.id === todoId);

      if (todoToDelete.isDefault) {
        await saveTodosWithError(todos.filter((todo) => todo.id !== todoId));
        return;
      }

      const result = await Swal.fire({
        title: "確定要刪除嗎？",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545cc",
        cancelButtonColor: "#788fd4",
        confirmButtonText: "刪除",
        cancelButtonText: "取消",
      });

      if (result.isConfirmed) {
        await saveTodosWithError(todos.filter((todo) => todo.id !== todoId));
      }
    },
    [todos]
  );

  const toggleTodo = useCallback(
    async (todoId) => {
      const updatedTodos = todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      );
      await saveTodosWithError(updatedTodos);
    },
    [todos]
  );

  const handleSort = useCallback(
    (checked) => {
      setSortCompleted(checked);
      if (checked) {
        saveTodosWithError(todos.filter((todo) => !todo.isDefault));
      }
    },
    [todos]
  );

  const getSortedTodos = useCallback(() => {
    if (!sortCompleted) return todos;
    return [...todos].sort((a, b) => {
      if (!a.completed && b.completed) return -1;
      if (a.completed && !b.completed) return 1;
      return b.timestamp - a.timestamp;
    });
  }, [todos, sortCompleted]);

  return {
    todos,
    sortCompleted,
    addTodo,
    deleteTodo,
    toggleTodo,
    handleSort,
    getSortedTodos,
  };
};
