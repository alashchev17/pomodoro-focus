import { useEffect, useState } from "react";
import addNotification from "react-push-notification";
import useSound from "use-sound";
import "./Content.css";
import ContentTab from "./ContentTab.jsx";

const Content = ({ updateProgress, updateBackground, updatedSettingsData }) => {
  /* STATES FOR SOUNDS */
  const [playStartSound] = useSound("start-button-sound.mp3"); // path to deploy: "./start-button-sound.mp3"
  const [playPauseSound] = useSound("stop-button-sound.mp3"); // path to deploy: "./stop-button-sound.mp3"
  const [playStopTimerSound] = useSound("stop-timer-sound.mp3"); // path to deploy: "./stop-timer-sound.mp3"

  /* STATES FOR DYNAMIC DATA OF TIMER'S SETTINGS */
  const [cyclesAmountUntilLongBreak, setCyclesAmountUntilLongBreak] =
    useState(4); // initialState – from settings input
  const [settedMinutesFocus, setSettedMinutesFocus] = useState(25); // initialState – from settings input
  const [settedMinutesBreak, setSettedMinutesBreak] = useState(5); // initialState – from settings input
  const [settedMinutesLongBreak, setSettedMinutesLongBreak] = useState(15); // initialState – from settings input

  const [mode, setMode] = useState("focus");
  const [activeTab, setActiveTab] = useState("Pomodoro");

  const [activeButtonClassName, setActiveButtonClassName] = useState("");
  const [minutes, setMinutes] = useState(settedMinutesFocus);
  const [seconds, setSeconds] = useState(0);
  const [cyclesCounter, setCyclesCounter] = useState(1);
  const [slogan, setSlogan] = useState("Time to focus!");

  const requestPermission = () => {
    return new Promise((resolve, reject) => {
      const permissionResult = Notification.requestPermission((result) => {
        // Поддержка устаревшей версии с функцией обратного вызова.
        resolve(result);
      });

      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    }).then((permissionResult) => {
      if (permissionResult !== "granted") {
        throw new Error("Permission not granted.");
      }
    });
  };

  const updateSettingsData = (updatedSettingsData) => {
    setSettedMinutesFocus(updatedSettingsData.focusMinutes);
    setSettedMinutesBreak(updatedSettingsData.breakMinutes);
    setSettedMinutesLongBreak(updatedSettingsData.longBreakMinutes);
    setCyclesAmountUntilLongBreak(updatedSettingsData.cyclesUntilLongBreak);
  };

  const calculateTotalDuration = () => {
    switch (mode) {
      case "focus":
        return settedMinutesFocus * 60;
      case "break":
        return settedMinutesBreak * 60;
      case "longBreak":
        return settedMinutesLongBreak * 60;
    }
  };

  const notificationsHandle = (slogan) => {
    addNotification({
      title: slogan,
      native: true, // when using native, your OS will handle theming.
    });
  };

  const onModeChange = (mode) => {
    switch (mode) {
      case "focus":
        setMode(mode);
        setSlogan("Time to focus!");
        setMinutes(settedMinutesFocus);
        notificationsHandle(slogan);
        break;
      case "break":
        setMode(mode);
        setSlogan("Time for a break!");
        setMinutes(settedMinutesBreak);
        notificationsHandle(slogan);
        break;
      case "longBreak":
        setMode(mode);
        setSlogan("Good job! Time for a long break!");
        setMinutes(settedMinutesLongBreak);
        notificationsHandle(slogan);
    }
  };

  const stopTimer = () => {
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
    playStopTimerSound();

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
      setActiveTab("Long Break");
    } else {
      setMode("break");
      setSlogan("Time for a break!");
      setMinutes(settedMinutesBreak);
      setActiveTab("Short Break");
    }
  };

  const handleBreakEnd = () => {
    setMinutes(settedMinutesFocus);
    setCyclesCounter(cyclesCounter + 1);
    setMode("focus");
    setSlogan("Time to focus!");
    setActiveTab("Pomodoro");
  };

  const handleLongBreakEnd = () => {
    setMode("focus");
    setSlogan("Time to focus!");
    setMinutes(settedMinutesFocus);
    setCyclesCounter(cyclesCounter + 1);
    setActiveTab("Pomodoro");
  };

  const startTimer = () => {
    let interval = setInterval(() => {
      clearInterval(interval);
      handleTimer();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  };

  // when componentDidMount
  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    if (activeButtonClassName === "active") {
      startTimer();
    }
  }, [seconds, minutes, activeButtonClassName]);

  useEffect(() => {
    updateBackground(mode);
    document.title = `${timerMinutes}:${timerSeconds} - ${slogan}`;
  }, [mode, updateBackground, updateProgress]);

  useEffect(() => {
    notificationsHandle(slogan);
  }, [slogan]);

  useEffect(() => {
    // Обновляем состояние только если updatedSettingsData не пустой объект
    if (
      Object.keys(updatedSettingsData).length === 0 &&
      updatedSettingsData.constructor === Object
    ) {
      return;
    }
    updateSettingsData(updatedSettingsData);
  }, [updatedSettingsData]);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const buttonClasses = `content__button ${mode} ${activeButtonClassName}`;

  const onClickButtonHandler = () => {
    setActiveButtonClassName(activeButtonClassName ? "" : "active");
    if (activeButtonClassName === "active") {
      playPauseSound();
    } else {
      playStartSound();
    }
  };

  const onClickCounterHandler = (event) => {
    event.preventDefault();
    if (cyclesCounter !== 1) {
      if (confirm("Are you sure that you want to reset a counter?")) {
        setCyclesCounter(1);
      } else {
        return;
      }
    } else {
      return;
    }
  };

  const handleTabClick = (tabMode, tabText, isActive) => {
    if (activeButtonClassName === "active" || isActive) return;
    setActiveTab(tabText);
    onModeChange(tabMode);
    notificationsHandle(slogan);
    stopTimer();
    // console.log(updatedSettingsData);
  };

  return (
    <div className="content">
      <div className="content__timer">
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
        <span className="content__timer-clock">
          {timerMinutes}:{timerSeconds}
        </span>
        <button className={buttonClasses} onClick={onClickButtonHandler}>
          {activeButtonClassName === "active" ? "Pause" : "Start"}
        </button>
      </div>
      <a href="#" onClick={onClickCounterHandler} className="content__counter">
        #{cyclesCounter}
      </a>
      <span className="content__slogan">{slogan}</span>
    </div>
  );
};

export default Content;
