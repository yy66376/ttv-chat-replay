import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./features/video/videoSlice";

const rootStore = configureStore({
  reducer: {
    video: videoReducer,
  },
});

export type RootState = ReturnType<typeof rootStore.getState>;
export type RootDispatch = typeof rootStore.dispatch;

export default rootStore;
