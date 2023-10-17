import { useState } from "react";
import { Notifications } from "react-push-notification";
import Container from "./Components/UI/Container/Container.jsx";
import Header from "./Components/UI/Header/Header.jsx";
import Content from "./Components/UI/Content/Content.jsx";

const App = () => {
  const [progress, setProgress] = useState(0);
  const [background, setBackground] = useState("focus");

  const updateProgress = (newProgress) => {
    setProgress(newProgress);
  };

  const updateBackground = (mode) => {
    setBackground(mode);
  };

  const containerClasses = `container ${background}`;

  return (
    <>
      <Notifications />
      <Container className={containerClasses}>
        <Header progress={progress} />
        <Content
          updateProgress={updateProgress}
          updateBackground={updateBackground}
        />
      </Container>
    </>
  );
};

export default App;
