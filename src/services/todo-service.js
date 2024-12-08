import { defaultTodos } from "../constants/default-todos";
import Swal from "sweetalert2";

// 待辦事項相關的服務邏輯
// 處理資料的讀取、儲存和刪除確認
export const todoService = {
  // 從localStorage讀取待辦事項
  // 如果沒有資料或讀取失敗，回傳預設的待辦事項
  getTodos() {
    try {
      const todos = localStorage.getItem("todos");
      return todos ? JSON.parse(todos) : defaultTodos;
    } catch (error) {
      console.error("讀取待辦事項失敗:", error);
      return defaultTodos;
    }
  },

  // 將待辦事項儲存到localStorage
  // 儲存失敗會拋出錯誤
  saveTodos(todos) {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      throw new Error("儲存失敗");
    }
  },

  // 刪除確認邏輯：
  // 預設待辦事項直接刪除
  // 使用者新增的待辦事項會跳出確認視窗
  // 甜吐司的設定部分
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
