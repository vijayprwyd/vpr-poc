import React, { useCallback, useEffect, useRef, useState } from "react";
import { getScrollDirection } from "./utils";

type useIntersectProps<TElement> = {
  /**
   * Start Node to be observed
   */
  startRef: React.RefObject<TElement>;
  /**
   * End Node to be observed
   */
  endRef: React.RefObject<TElement>;

  /**
   * No of DOM elements to be rendered
   */
  listSize: number;
  /**
   * No of elements to be prefetched when the threshold is reached
   */
  prefetchWindowSize: number;
  /**
   * totalSize of elements
   */
   endIndex: number;
};

type intersectPosition = "top" | "bottom";

type PreviousIntersectionInfo = {
  previousY: number;
  previousRatio: number;
};

type PreviousIntersectionHistory = Record<
  intersectPosition,
  PreviousIntersectionInfo
>;

type ElementProps<TElement> = {
  id?: string;
  ref?: React.RefObject<TElement>;
};

const isIntersectPostionInfo = (position: any): position is intersectPosition =>
  position === "top" || position === "bottom";

export function useIntersect<TElement extends HTMLElement>({
  startRef,
  endRef,
  listSize,
  prefetchWindowSize,
  endIndex,
}: useIntersectProps<TElement>) {
  const observer = useRef<IntersectionObserver>();
  // const startRef = useRef<HTMLElement>(null);
  // const endRef = useRef<HTMLElement>(null);

  const [currentWindow, setCurrentWindow] = useState({
    start: 0,
    end: listSize,
  });

  // Used to determine the scroll direction
  const previousIntersectionInfo = useRef<PreviousIntersectionHistory>({
    top: {
      previousY: 0,
      previousRatio: 0,
    },

    bottom: {
      previousY: 0,
      previousRatio: 0,
    },
  });

  const stopObserve = useCallback(() => {
    if (observer.current && startRef.current)
      observer.current.unobserve(startRef.current);
    if (observer.current && endRef.current)
      observer.current.unobserve(endRef.current);
  }, [endRef, startRef]);

  const onObserve = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        //1. Find direction of scroll
        if (!isIntersectPostionInfo(entry.target.id)) return;

        let direction = getScrollDirection({
          currentY: entry.boundingClientRect.y,
          previousY:
            isIntersectPostionInfo(entry.target.id) &&
            previousIntersectionInfo.current
              ? previousIntersectionInfo.current[entry.target.id].previousY
              : 0,
          currentRatio: entry.intersectionRatio,
          isIntersecting: entry.isIntersecting,
          previousRatio:
            isIntersectPostionInfo(entry.target.id) &&
            previousIntersectionInfo.current
              ? previousIntersectionInfo.current[entry.target.id].previousRatio
              : 0,
        });
        previousIntersectionInfo.current[entry.target.id].previousRatio =
          entry.intersectionRatio;
        previousIntersectionInfo.current[entry.target.id].previousY =
          entry.boundingClientRect.y;

        switch (direction) {
          case "SCROLL_UP_ENTER":
            /* 
           User is scrolling up . 
           So say if our current viewport renders elements 80 -100 , it should now render elements 60-80 for windowSize of 20
           No update required if user is already at top and views elements 0-20
          */
            if (currentWindow.start >= prefetchWindowSize) {
              stopObserve();
              setCurrentWindow({
                start: currentWindow.start - prefetchWindowSize,
                end: currentWindow.end - prefetchWindowSize,
              });
            }
            break;

          case "SCROLL_DOWN_ENTER":
            if (currentWindow.end < endIndex) {
              stopObserve();

              setCurrentWindow({
                start:
                  currentWindow.end < endIndex
                    ? currentWindow.start + prefetchWindowSize
                    : currentWindow.start,
                end:
                  currentWindow.end < endIndex
                    ? currentWindow.end + prefetchWindowSize
                    : currentWindow.end + prefetchWindowSize,
              });    
            }
            break;
        }
      });
    },
    [currentWindow.start, currentWindow.end, prefetchWindowSize, endIndex, stopObserve]
  );

  const getElementProps = useCallback((index) => {
    const props: ElementProps<TElement> = {};
    if (index === currentWindow.end-currentWindow.start-1 || index === 0) {
      props.id = index === 0 ? "top" : "bottom";
      props.ref = index === 0 ? startRef : endRef;
    }
    return props;
  }, [currentWindow.end, currentWindow.start, endRef, startRef]);

  useEffect(() => {
    observer.current = new IntersectionObserver(onObserve, {
      root: null,
    });

    // 1. Observe startRef
    if (startRef.current) observer.current.observe(startRef.current);
    // 2. Observe endref
    if (endRef.current) observer.current.observe(endRef.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [endRef, onObserve, startRef]);

  return {
    currentWindow,
    getElementProps,
  };
}
