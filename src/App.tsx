import classes from "./App.module.scss";
import ResizeableTwoColumnLayout from "./components/ui/layout/ResizeableTwoColumnLayout";
import VideoSelector from "./components/video/VideoSelector";
import ChatSelector from "./components/chat/ChatSelector";

function App() {
  return (
    <div className={classes["app"]}>
      <ResizeableTwoColumnLayout
        col1ClassName={classes["video-container"]}
        col2ClassName={classes["chat-container"]}
      >
        <VideoSelector />
        <ChatSelector />
      </ResizeableTwoColumnLayout>
    </div>
  );
}

export default App;
