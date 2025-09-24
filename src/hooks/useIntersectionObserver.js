import { useEffect, useState } from "react";

export default function useIntersectionObserver(ref, options) {
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
      },
      options || {
        root: null,
        rootMargin: "0px",
        // You can add threshold array if needed, e.g., threshold: buildThresholdList(),
        threshold: 1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return entry;
}
