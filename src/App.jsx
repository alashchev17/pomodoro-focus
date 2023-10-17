import { useState } from "react";
import { Notifications } from "react-push-notification";
import Container from "./Components/UI/Container/Container.jsx";
import Header from "./Components/UI/Header/Header.jsx";
import Content from "./Components/UI/Content/Content.jsx";
import SettingsModal from "./Components/UI/SettingsModal/SettingsModal.jsx";

const App = () => {
  const [progress, setProgress] = useState(0);
  const [background, setBackground] = useState("focus");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [settingsData, setSettingsData] = useState({});

  const updateProgress = (newProgress) => {
    setProgress(newProgress);
  };

  const updateModal = (state) => {
    setIsModalOpen(state);
  };

  const updateBackground = (mode) => {
    setBackground(mode);
  };

  const updateSettingsData = (settingsData) => {
    setSettingsData(settingsData);
  };

  const containerClasses = `container ${background}`;

  return (
    <>
      <Notifications />
      <Container className={containerClasses}>
        <Header progress={progress} updateModal={updateModal} />
        <Content
          updateProgress={updateProgress}
          updateBackground={updateBackground}
          updatedSettingsData={settingsData}
        />
        <SettingsModal
          modalOpen={isModalOpen}
          updateModal={updateModal}
          updateSettingsData={updateSettingsData}
        />
      </Container>
    </>
  );
};

export default App;
