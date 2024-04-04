import classes from "./App.module.scss";
import Chat from "./components/chat/Chat";
import ResizeableTwoColumnLayout from "./components/ui/layout/ResizeableTwoColumnLayout";
import VideoSelector from "./components/VideoSelector";
import VideoPlayerContextProvider from "./store/video-player-context";

function App() {
  return (
    <div className={classes["app"]}>
      <VideoPlayerContextProvider>
        <ResizeableTwoColumnLayout
          col1ClassName={classes["video-container"]}
          col2ClassName={classes["chat-container"]}
        >
          <VideoSelector/>
          <Chat/>
        </ResizeableTwoColumnLayout>
      </VideoPlayerContextProvider>
    </div>
  );
}

export default App;
