import React from "react";
import "./ProgressBar.css";

// 進度條：顯示除範例代辦事項外，使用者新增的條目
const ProgressBar = ({ todos }) => {
  // 無待辦事項時回傳0，計算代辦事項時，百分比四捨五入到整數
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
