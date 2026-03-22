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

/*
Import:
import Video from "@/blocks/elements/video/Video";

Props:
- src: video source path or url
- poster: preview image for the video
- className: custom classes for styling
- controls: shows video controls
- autoPlay: starts video automatically
- loop: repeats the video
- muted: mutes the video sound
- ...props: extra native video attributes
*/
