import * as React from "react";
import loadImage from "./loadImage";

const cache = new Map();

const LOADING = "LOADING";
const LOADED = "LOADED";
const FAILED = "FAILED";

export default function useLoadImage(src: string) {
  const cachedImg = cache.get(src);
  const initialState = cachedImg ? LOADED : LOADING;
  const [status, setStatus] = React.useState(initialState);
  const ref = React.useRef(false);

  React.useEffect(() => {
    (async () => {
      if (!src || status === LOADED) return;
      ref.current = true;

      try {
        const img = await loadImage(src);
        if (!ref.current) return;

        cache.set(src, img);
        setStatus(LOADED);
      } catch(err) {
        if (!ref.current) return;

        cache.delete(src);
        setStatus(FAILED);
      }

      return () => {
        ref.current = false;
      }
    })();
  }, [src, status]);

  return [status, cachedImg];
}
