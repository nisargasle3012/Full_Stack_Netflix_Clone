import { useState, useEffect, useCallback } from "react";

export default function useOffSetTop(top) {
  const [offsetTop, setOffsetTop] = useState(false);

  const onScroll = useCallback(() => {
    if (window.pageYOffset > top) {
      setOffsetTop(true);
    } else {
      setOffsetTop(false);
    }
  }, [top]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return offsetTop;
}
