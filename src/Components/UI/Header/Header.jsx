import "./Header.css";
const Header = (props) => {
  return (
    <header className="header">
      <a href="./" className="header__link">
        Pomodoro Focus
      </a>
      <a
        href="#"
        className="header__link"
        onClick={() => {
          alert(
            `
settingsObject = {
  cyclesAmountUntilLongBreak: 4,
  settedMinutesFocus: 25,
  settedMinutesBreak: 5,
  settedMinutesLongBreak: 15
};
            `,
          );
        }}
      >
        Settings
      </a>
      <span
        className="header__progress"
        style={{ width: `${props.progress}%` }}
      ></span>
    </header>
  );
};

export default Header;
