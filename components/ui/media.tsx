"use client";

import * as React from "react";
import Image from "next/image";

interface MediaProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  // video props
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
  // image props
  fill?: boolean;
}

const isImage = (src: string): boolean => {
  return /\.(png|jpg|jpeg|webp|gif|tiff|bmp|heif|svg|eps|pdf|psd|ai|xcf|indd|raw)$/i.test(
    src
  );
};

const isVideo = (src: string): boolean => {
  return /\.(mp4|avi|mkv|3gp|webm|dat|mpg|mpeg|gifv|wmv|flv|mov|wmv|f4v|mkv|avchd|ogv|m4v)$/i.test(
    src
  );
};

export const Media = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & MediaProps
>(function Media(
  {
    src,
    height,
    width,
    alt = "Media content",
    // image
    fill,
    // video
    controls,
    loop,
    muted,
    autoPlay,
    playsInline,
    ...props
  },
  ref
) {
  const rest = { ref, width, height, ...props };
  const restImg = { fill, src, alt, ...rest };
  const restVid = { controls, loop, muted, autoPlay, playsInline, ...rest };
  if (isImage(src)) {
    return (
      // @ts-ignore
      <Image {...restImg} />
    );
  } else if (isVideo(src)) {
    return (
      // @ts-ignore
      <video {...restVid}>
        <source src={src} type={`video/${src.split(".").pop()}`} />
        Your browser does not support the video tag.
      </video>
    );
  } else {
    return <p>Unsupported media format</p>;
  }
});
