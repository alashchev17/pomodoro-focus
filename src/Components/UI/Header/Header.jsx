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
          props.updateModal(true);
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
