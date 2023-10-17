import { useState } from "react";

const ContentTab = ({ text, isActive, onTabClick, mode }) => {
  const handleClick = (event) => {
    event.preventDefault();
    onTabClick(mode, text, isActive);
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
