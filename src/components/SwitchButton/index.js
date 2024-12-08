import React from "react";
import { Form } from "react-bootstrap";
import { useTodoContext } from "../../context/TodoContext";
import "./SwitchButton.css";

// 排序切換按鈕組件
// 控制已完成事項是否移到列表底部
const SwitchButton = () => {
  const { sortCompleted, handleSort } = useTodoContext();

  // 處理切換狀態的變化
  const handleChange = (e) => {
    handleSort(e.target.checked);
  };

  return (
    <div className="switch-container">
      <Form.Check
        type="switch"
        id="sort-switch"
        className="custom-switch"
        checked={sortCompleted}
        onChange={handleChange}
      />
      <label htmlFor="sort-switch" className="switch-label">
        Move done things to end?
      </label>
    </div>
  );
};

export default SwitchButton;
