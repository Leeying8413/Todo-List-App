import { defaultTodos } from "../constants/defaultTodos";

export const todoService = {
  getTodos() {
    try {
      const todos = localStorage.getItem("todos");
      return todos ? JSON.parse(todos) : defaultTodos;
    } catch (error) {
      console.error("讀取待辦事項失敗:", error);
      return defaultTodos;
    }
  },

  saveTodos(todos) {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      throw new Error("儲存待辦事項失敗");
    }
  },
};
