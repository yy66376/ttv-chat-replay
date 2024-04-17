import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import clamp from "../../../../utility/clamp";
import type { RootState } from "../../root-store";

export enum OverlayIcon {
  Nothing,
  Play,
  Pause,

  /// These enums have two of each since the same command can be issued multiple times
  SkipForward1,
  SkipForward2,
  SkipBackward1,
  SkipBackward2,
  VolumeUp1,
  VolumeUp2,
  VolumeDown1,
  VolumeDown2,
  VolumeMute1,
  VolumeMute2,
}

export interface VideoState {
  /**
   * Overlay icon to use.
   */
  overlayIcon: OverlayIcon;
  /**
   * List of sources in the video.
   */
  sources: string[];
  /**
   * The video's current volume, a float from 0 to 1.
   */
  volume: number;
  /**
   * The video's current time, measured in seconds, used for display purposes
   * (i.e., in the video timeline or time/duration control).
   */
  displayTime: number;
  /**
   * The video's current time, measured in seconds, used for controlling the video's
   * current time (i.e., used for skip and seek).
   */
  realTime: number;
  /**
   * The video's duration, measured in seconds.
   */
  duration: number;
  /**
   * The speed at which the video is playing.
   */
  playbackRate: number;
  /**
   * Whether the video has finished playback.
   */
  isEnded: boolean;
  /**
   * Whether the video is playing.
   */
  isPlaying: boolean;
  /**
   * Whether the video is in fullscreen.
   */
  isFullscreen: boolean;
  /**
   * Whether the video is muted.
   */
  isMuted: boolean;
  /**
   * Whether the video is in picture-in-picture mode.
   */
  isPip: boolean;
}

const initialState: VideoState = {
  overlayIcon: OverlayIcon.Nothing,
  sources: [],
  volume: 1,
  displayTime: 0,
  realTime: 0,
  duration: 0,
  playbackRate: 1,
  isEnded: false,
  isPlaying: false,
  isFullscreen: false,
  isMuted: false,
  isPip: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setSources: (state, action: PayloadAction<string[]>) => {
      state.sources = action.payload;
    },
    setDisplayTime: (state, action: PayloadAction<number>) => {
      const newTime = action.payload;
      state.displayTime = newTime;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      const newVolume = action.payload;
      state.volume = newVolume;
    },
    setPlaybackRate: (state, action: PayloadAction<number>) => {
      const newPlaybackRate = action.payload;
      state.playbackRate = newPlaybackRate;
    },
    increasePlaybackRate: (state) => {
      state.playbackRate = Math.min(2, state.playbackRate + 0.25);
    },
    decreasePlaybackRate: (state) => {
      state.playbackRate = Math.max(0.25, state.playbackRate - 0.25);
    },
    loadedMetadata: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
      state.isPlaying = true;
    },
    seek: (state, action: PayloadAction<number>) => {
      const newTime = action.payload;
      state.realTime = newTime;
      state.displayTime = newTime;
      state.isEnded = newTime >= state.duration;
    },
    skip: (state, action: PayloadAction<number>) => {
      const newTime = clamp(
        state.displayTime + action.payload,
        0,
        state.duration
      );
      state.realTime = newTime;
      state.displayTime = newTime;
      state.isEnded = newTime >= state.duration;
      if (action.payload > 0) {
        state.overlayIcon =
          state.overlayIcon !== OverlayIcon.SkipForward1
            ? OverlayIcon.SkipForward1
            : OverlayIcon.SkipForward2;
      } else {
        state.overlayIcon =
          state.overlayIcon !== OverlayIcon.SkipBackward1
            ? OverlayIcon.SkipBackward1
            : OverlayIcon.SkipBackward2;
      }
    },
    replay: (state) => {
      state.realTime = 0;
      state.displayTime = 0;
      state.isEnded = false;
      state.isPlaying = true;
    },
    end: (state) => {
      state.isEnded = true;
    },
    play: (state) => {
      state.overlayIcon = OverlayIcon.Play;
      state.isPlaying = true;
      state.isEnded = false;
    },
    pause: (state) => {
      state.overlayIcon = OverlayIcon.Pause;
      state.isPlaying = false;
    },
    togglePlayPause: (state) => {
      const newIsPlaying = !state.isPlaying;
      state.overlayIcon = newIsPlaying ? OverlayIcon.Play : OverlayIcon.Pause;
      state.isPlaying = newIsPlaying;
      if (newIsPlaying) state.isEnded = false;
    },
    toggleFullscreen: (state) => {
      const newIsFullscreen = !state.isFullscreen;
      state.isFullscreen = newIsFullscreen;
    },
    enterPip: (state) => {
      state.isPip = true;
    },
    leavePip: (state) => {
      state.isPip = false;
    },
    togglePip: (state) => {
      const newisPip = !state.isPip;
      state.isPip = newisPip;
      if (newisPip) state.isFullscreen = false; // automatically exits full screen when entering PiP, so update state to be consistent
    },
    toggleMute: (state) => {
      const newIsMuted = !state.isMuted;
      state.isMuted = newIsMuted;
    },
    increaseVolume: (state) => {
      state.overlayIcon =
        state.overlayIcon !== OverlayIcon.VolumeUp1
          ? OverlayIcon.VolumeUp1
          : OverlayIcon.VolumeUp2;
      state.volume = Math.min(1, state.volume + 0.05);
    },
    decreaseVolume: (state) => {
      const newVolume = Math.max(0, state.volume - 0.05);
      if (newVolume > 0) {
        state.overlayIcon =
          state.overlayIcon !== OverlayIcon.VolumeDown1
            ? OverlayIcon.VolumeDown1
            : OverlayIcon.VolumeDown2;
      } else {
        state.overlayIcon =
          state.overlayIcon !== OverlayIcon.VolumeMute1
            ? OverlayIcon.VolumeMute1
            : OverlayIcon.VolumeMute2;
      }
      state.volume = newVolume;
    },
  },
});

export const {
  loadedMetadata,
  seek,
  skip,
  replay,
  setDisplayTime,
  setSources,
  setVolume,
  setPlaybackRate,
  end,
  pause,
  play,
  togglePlayPause,
  toggleFullscreen,
  enterPip,
  leavePip,
  togglePip,
  toggleMute,
  increaseVolume,
  decreaseVolume,
  increasePlaybackRate,
  decreasePlaybackRate,
} = videoSlice.actions;

export const selectOverlayIcon = (state: RootState) => state.video.overlayIcon;
export const selectSources = (state: RootState) => state.video.sources;
export const selectDisplayTime = (state: RootState) => state.video.displayTime;
export const selectRealTime = (state: RootState) => state.video.realTime;
export const selectDuration = (state: RootState) => state.video.duration;
export const selectIsEnded = (state: RootState) => state.video.isEnded;
export const selectIsPlaying = (state: RootState) => state.video.isPlaying;
export const selectIsFullscreen = (state: RootState) =>
  state.video.isFullscreen;
export const selectIsPip = (state: RootState) => state.video.isPip;
export const selectIsMuted = (state: RootState) => state.video.isMuted;
export const selectVolume = (state: RootState) => state.video.volume;
export const selectPlaybackRate = (state: RootState) =>
  state.video.playbackRate;

export default videoSlice.reducer;
