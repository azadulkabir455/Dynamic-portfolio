import clsx from "clsx";
import { VideoProps } from "./type";

export const Video = ({
  src,
  poster,
  className,
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
  ...props
}: VideoProps) => {
  return (
    <video
      src={src}
      poster={poster}
      controls={controls}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      className={clsx("h-auto w-full rounded-md", className)}
      {...props}
    />
  );
};

export default Video;
