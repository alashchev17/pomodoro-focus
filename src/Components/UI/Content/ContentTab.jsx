import { useState } from "react";

const ContentTab = ({ text, isActive, onTabClick, mode }) => {
  const handleClick = () => {
    onTabClick(mode, text);
  };
  return (
    <a
      href="#"
      className={`content__tabs-link ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      {text}
    </a>
  );
};

export default ContentTab;
