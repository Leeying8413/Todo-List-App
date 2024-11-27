import React from "react";
import { Form } from "react-bootstrap";
import "./SwitchButton.css";

const SwitchButton = ({ sortCompleted, onToggle }) => {
  const handleChange = (e) => {
    // 調用傳入的 onToggle 函數
    onToggle(e.target.checked);
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
