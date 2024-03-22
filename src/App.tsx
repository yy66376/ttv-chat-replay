import classes from "./App.module.scss";
import VideoSelector from "./components/VideoSelector";
import VideoPlayerContextProvider from "./store/video-player-context";

function App() {
  return (
    <div className={classes["app"]}>
      <VideoPlayerContextProvider>
        <VideoSelector />
      </VideoPlayerContextProvider>
    </div>
  );
}

export default App;
