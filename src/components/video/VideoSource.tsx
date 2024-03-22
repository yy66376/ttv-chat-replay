import { DetailedHTMLProps, SourceHTMLAttributes } from "react";

export type VideoSourceProps = Omit<
  DetailedHTMLProps<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>,
  "srcSet" | "sizes" | "height" | "width"
>;

const VideoSource = (props: VideoSourceProps) => {
  return <source {...props} />;
};

export default VideoSource;
