import { useEffect, useState, useRef } from "react";
import { usePortal } from "../providers/PortalProvider";
import { useGetConfigurationQuery } from "../store/slices/configuration";
import VideoItemWithHoverPure from "./VideoItemWithHoverPure";

export default function VideoItemWithHover({ video }) {
  const setPortal = usePortal();
  const elementRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const { data: configuration } = useGetConfigurationQuery();

  useEffect(() => {
    if (isHovered && elementRef.current) {
      setPortal(elementRef.current, video);
    }
  }, [isHovered, setPortal, video]);

  const src = configuration?.images?.base_url
    ? `${configuration.images.base_url}w300${video.backdrop_path}`
    : "";

  return (
    <VideoItemWithHoverPure
      ref={elementRef}
      handleHover={setIsHovered}
      src={src}
    />
  );
}
