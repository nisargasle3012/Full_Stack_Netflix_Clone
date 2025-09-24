import { PureComponent, forwardRef } from "react";

class VideoItemWithHoverPure extends PureComponent {
  render() {
    const { src, innerRef, handleHover } = this.props;

    return (
      <div
        ref={innerRef}
        style={{
          zIndex: 9,
          cursor: "pointer",
          borderRadius: "4px",
          width: "100%",
          position: "relative",
          paddingTop: "calc(9 / 16 * 100%)",
        }}
      >
        <img
          src={src}
          style={{
            top: 0,
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            borderRadius: "4px",
          }}
          onPointerEnter={() => handleHover(true)}
          onPointerLeave={() => handleHover(false)}
        />
      </div>
    );
  }
}

const VideoItemWithHoverRef = forwardRef((props, ref) => (
  <VideoItemWithHoverPure {...props} innerRef={ref} />
));

VideoItemWithHoverRef.displayName = "VideoItemWithHoverRef";

export default VideoItemWithHoverRef;
