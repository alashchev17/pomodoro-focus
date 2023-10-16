import React, { useEffect, useState } from "react";
import "./Content.css";
import ContentTab from "./ContentTab.jsx";

const Content = ({ updateProgress, updateBackground }) => {
  const cyclesAmountUntilLongBreak = 4; // hardcoded amount of cycles before a long break starts
  const [mode, setMode] = useState("focus");
  const [settedMinutesFocus, setSettedMinutesFocus] = useState(25); // initialState – from settings input
  const [settedMinutesBreak, setSettedMinutesBreak] = useState(5); // initialState – from settings input
  const [settedMinutesLongBreak, setSettedMinutesLongBreak] = useState(15); // initialState – from settings input
  const [activeTab, setActiveTab] = useState("Pomodoro");

  const [activeButtonClassName, setActiveButtonClassName] = useState("");
  const [minutes, setMinutes] = useState(settedMinutesFocus);
  const [seconds, setSeconds] = useState(0);
  const [cyclesCounter, setCyclesCounter] = useState(1);
  const [slogan, setSlogan] = useState("Time to focus!");

  const calculateTotalDuration = () => {
    switch (mode) {
      case "focus":
        return settedMinutesFocus * 60;
      case "break":
        return settedMinutesBreak * 60;
      default:
        return settedMinutesLongBreak * 60;
    }
  };

  const onModeChange = (mode) => {
    switch (mode) {
      case "focus":
        setMode(mode);
        setSlogan("Time to focus!");
        setMinutes(settedMinutesFocus);
        break;
      case "break":
        setMode(mode);
        setSlogan("Time for a break");
        setMinutes(settedMinutesBreak);
        break;
      case "longBreak":
        setMode(mode);
        setSlogan("Good job! Time for a long break!");
        setMinutes(settedMinutesLongBreak);
    }
  };

  const stopTimer = () => {
    setMinutes(0);
    setSeconds(0);
    updateProgress(0);
  };

  const handleTimer = () => {
    const totalDuration = calculateTotalDuration();
    const totalSeconds = minutes * 60 + seconds;
    const progress = ((totalDuration - totalSeconds) / totalDuration) * 100;

    updateProgress(progress);

    if (seconds === 0) {
      handleTimerZero();
    } else {
      setSeconds(seconds - 1);
    }
  };

  const handleTimerZero = () => {
    if (minutes !== 0) {
      setSeconds(59);
      setMinutes(minutes - 1);
    } else {
      handleTimerEnd();
    }
  };

  const handleTimerEnd = () => {
    setSeconds(0);
    updateProgress(0);
    setActiveButtonClassName("");

    if (mode === "focus") {
      handleFocusEnd();
    } else if (mode === "break") {
      handleBreakEnd();
    } else {
      handleLongBreakEnd();
    }

    updateBackground(mode);
  };

  const handleFocusEnd = () => {
    if (cyclesCounter % cyclesAmountUntilLongBreak === 0) {
      setMode("longBreak");
      setSlogan("Great job! Time for a long break!");
      setMinutes(settedMinutesLongBreak);
    } else {
      setMode("break");
      setSlogan("Time for a break!");
      setMinutes(settedMinutesBreak);
    }
  };

  const handleBreakEnd = () => {
    setMinutes(settedMinutesFocus);
    setCyclesCounter(cyclesCounter + 1);
    setMode("focus");
    setSlogan("Time to focus!");
  };

  const handleLongBreakEnd = () => {
    setMode("focus");
    setSlogan("Time to focus!");
    setMinutes(settedMinutesFocus);
    setCyclesCounter(cyclesCounter + 1);
  };

  const startTimer = () => {
    let interval = setInterval(() => {
      clearInterval(interval);
      handleTimer();
    }, 1000);
    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (activeButtonClassName === "active") {
      startTimer();
    }
  }, [seconds, minutes, activeButtonClassName]);

  useEffect(() => {
    updateBackground(mode);
  }, [mode, updateBackground]);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const buttonClasses = `content__button ${mode} ${activeButtonClassName}`;

  const onClickButtonHandler = () => {
    setActiveButtonClassName(activeButtonClassName ? "" : "active");
  };

  const handleTabClick = (tabMode, tabText) => {
    if (activeButtonClassName === "active") return;
    setActiveTab(tabText);
    onModeChange(tabMode);
    updateProgress(0);
    setSeconds(0);
  };

  return (
    <div className="content">
      <div className="content__timer">
        {/* JSX-код, до секции с табами */}
        <div className="content__tabs">
          <ContentTab
            text="Pomodoro"
            isActive={activeTab === "Pomodoro"}
            mode="focus"
            onTabClick={handleTabClick}
          />
          <ContentTab
            text="Short Break"
            isActive={activeTab === "Short Break"}
            mode="break"
            onTabClick={handleTabClick}
          />
          <ContentTab
            text="Long Break"
            isActive={activeTab === "Long Break"}
            mode="longBreak"
            onTabClick={handleTabClick}
          />
        </div>
        {/* JSX-код, после секции с табами */}
        <span className="content__timer-clock">
          {timerMinutes}:{timerSeconds}
        </span>
        <button className={buttonClasses} onClick={onClickButtonHandler}>
          {activeButtonClassName === "active" ? "Pause" : "Start"}
        </button>
      </div>
      <span className="content__counter">#{cyclesCounter}</span>
      <span className="content__slogan">{slogan}</span>
    </div>
  );
};

export default Content;
