type ScrollDirectionProps = {
    currentY: number;
    previousY: number;
    currentRatio: number;
    previousRatio: number;
    isIntersecting: boolean;
}


type ScrollDirection = "SCROLL_DOWN_ENTER" | "SCROLL_DOWN_LEAVE" | "SCROLL_UP_LEAVE" | "SCROLL_UP_ENTER" | undefined;

export function getScrollDirection({
    currentY,
    previousY,
    currentRatio,
    previousRatio,
    isIntersecting
  }: ScrollDirectionProps): ScrollDirection {

    if (currentY < previousY) {
      return currentRatio > previousRatio && isIntersecting
        ? "SCROLL_DOWN_ENTER"
        : "SCROLL_DOWN_LEAVE";
    } else if (currentY > previousY && isIntersecting) {
      return currentRatio < previousRatio ? "SCROLL_UP_LEAVE" : "SCROLL_UP_ENTER";
    }
  }
  