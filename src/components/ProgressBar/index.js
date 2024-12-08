import React from "react";
import { useTodoContext } from "../../context/TodoContext";
import "./ProgressBar.css";

// 顯示完成進度的組件
// 計算非預設待辦事項的完成百分比
const ProgressBar = () => {
  const { todos } = useTodoContext();

  // 計算進度：排除預設項目，四捨五入到整數
  const calculateProgress = () => {
    const actualTodos = todos.filter((todo) => !todo.isDefault);
    if (actualTodos.length === 0) return 0;

    const completedCount = actualTodos.filter((todo) => todo.completed).length;
    return Math.round((completedCount / actualTodos.length) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="progress-container">
      <span className="progress-text">{progress}%</span>
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
