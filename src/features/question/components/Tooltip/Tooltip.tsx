import * as React from "react";
import "./Tooltip.css";

interface ITooltip {
  content: JSX.Element;
  disabled: boolean;
  children?: JSX.Element;
}

const Tooltip = ({ content, disabled, children }: ITooltip) => {
  return (
    <div className="tooltipContainer">
      <div className={`customTooltip ${disabled ? "disabled" : ""}`}>{content}</div>
      {children}
    </div>
  );
};

export default Tooltip;
