import "./SettingsModal.css";
import { useState } from "react";
import SettingsModalInput from "./SettingsModalInput.jsx";

const SettingsModal = (props) => {
  const classes = `settings-modal__background ${
    props.modalOpen ? "" : "hidden"
  }`;

  const closeModal = (event) => {
    event.preventDefault();
    props.updateModal(false);
    props.updateSettingsData(settingsData);
  };

  const [focusMinutes, setFocusMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);
  let settingsData = {
    focusMinutes: focusMinutes,
    breakMinutes: breakMinutes,
    longBreakMinutes: longBreakMinutes,
  };

  const focusMinutesChangeHandler = (newValue) => {
    setFocusMinutes(newValue);
  };
  const breakMinutesChangeHandler = (newValue) => {
    setBreakMinutes(newValue);
  };
  const longBreakMinutesChangeHandler = (newValue) => {
    setLongBreakMinutes(newValue);
  };

  return (
    <div className={classes}>
      <div className="settings-modal">
        <div className="settings-modal__header">
          <span className="settings-modal__title">Settings</span>
          <a href="#" className="settings-modal__close" onClick={closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="14"
              viewBox="0 0 13 14"
              fill="none"
            >
              <rect
                x="0.5"
                y="11.5962"
                width="15"
                height="2"
                rx="1"
                transform="rotate(-45 0.5 11.5962)"
                fill="#D9D9D9"
              />
              <rect
                x="11.1066"
                y="13.0104"
                width="15"
                height="2"
                rx="1"
                transform="rotate(-135 11.1066 13.0104)"
                fill="#D9D9D9"
              />
            </svg>
          </a>
        </div>
        <div className="settings-modal__content">
          <div className="settings-modal__block">
            <h2 className="settings-modal__category">Timer</h2>
            <h6 className="settings-modal__subcategory">Time (minutes)</h6>
            <div className="settings-modal__wrapper">
              <SettingsModalInput
                label="Pomodoro"
                value={focusMinutes}
                onInputChange={focusMinutesChangeHandler}
              />
              <SettingsModalInput
                label="Short Break"
                value={breakMinutes}
                onInputChange={breakMinutesChangeHandler}
              />
              <SettingsModalInput
                label="Long Break"
                value={longBreakMinutes}
                onInputChange={longBreakMinutesChangeHandler}
              />
            </div>
          </div>
          <div className="settings-modal__block">
            {/* вёрстка секции под циклы */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
