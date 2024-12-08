import { defaultTodos } from "../constants/default-todos";
import Swal from "sweetalert2";

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
      throw new Error("儲存失敗");
    }
  },

  // 處理刪除確認
  async confirmDelete(todo) {
    if (todo.isDefault) return true;

    const result = await Swal.fire({
      title: "確定要刪除嗎？",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545cc",
      cancelButtonColor: "#788fd4",
      confirmButtonText: "刪除",
      cancelButtonText: "取消",
    });

    return result.isConfirmed;
  },
};
