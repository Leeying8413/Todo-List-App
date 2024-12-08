import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { todoService } from "../services/todo-service";

// 跨組件共享待辦事項的狀態
const TodoContext = createContext(null);

export const TodoProvider = ({ children }) => {
  // 從 localStorage 讀取資料，如果沒有就用預設值
  const [todos, setTodos] = useState(() => todoService.getTodos());
  const [sortCompleted, setSortCompleted] = useState(false);

  // 當 todos 改變時，自動存到 localStorage
  useEffect(() => {
    todoService.saveTodos(todos);
  }, [todos]);

  // 刪除待辦事項
  const handleDelete = useCallback(
    async (todoId) => {
      const todoToDelete = todos.find((todo) => todo.id === todoId);
      const shouldDelete = await todoService.confirmDelete(todoToDelete);

      if (shouldDelete) {
        setTodos(todos.filter((todo) => todo.id !== todoId));
      }
    },
    [todos]
  );

  // 切換待辦事項狀態
  // 使用map遍歷並只更新目標項目狀態
  const handleToggle = useCallback(
    (todoId) => {
      setTodos(
        todos.map((todo) =>
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        )
      );
    },
    [todos]
  );

  // 新增待辦事項
  const handleAddTodo = useCallback((text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      timestamp: Date.now(),
      isDefault: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  }, []);

  // 處理排序切換
  // 開啟時移除所有預設事項
  // 同時更新排序狀態
  const handleSort = useCallback((checked) => {
    setSortCompleted(checked);
    if (checked) {
      // 啟動排序時移除預設事項
      setTodos((prev) => prev.filter((todo) => !todo.isDefault));
    }
  }, []);

  // 取得排序後的待辦事項
  // 1. 未完成的排在前面
  // 2. 已完成的排在後面
  // 3. 同類型內部按時間戳排序
  const getSortedTodos = useCallback(() => {
    if (!sortCompleted) return todos;

    return [...todos].sort((a, b) => {
      if (!a.completed && b.completed) return -1;
      if (a.completed && !b.completed) return 1;
      return b.timestamp - a.timestamp;
    });
  }, [todos, sortCompleted]);

  // 提供給子組件的值
  const value = {
    todos,
    sortCompleted,
    handleDelete,
    handleToggle,
    handleAddTodo,
    handleSort,
    getSortedTodos,
  };

  // 使用 Provider 包裹子組件，使其能訪問value的狀態
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

// 自訂 Hook 讓子組件更容易使用 Context
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext 必須在 TodoProvider 內使用！");
  }
  return context;
};
