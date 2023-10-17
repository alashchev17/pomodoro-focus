const SettingsModalInput = (props) => {
  const inputChangeHandler = (event) => {
    const newValue = Number(event.target.value);
    props.onInputChange(newValue);
  };

  return (
    <label className="settings-modal__label">
      {props.label}
      <input
        type="number"
        className="settings-modal__input"
        value={props.value}
        onChange={inputChangeHandler}
      />
    </label>
  );
};

export default SettingsModalInput;
