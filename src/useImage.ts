import * as React from "react";
import { IImageState, TStatus } from "./useImage.types";

// const cache = new Map();

const LOADING: TStatus = "LOADING";
const LOADED: TStatus = "LOADED";
const FAILED: TStatus = "FAILED";

const initialState: IImageState = { image: undefined, status: "NONE" };

export function useImage(src: string, crossOrigin?: string | null) {
  const [state, setState] = React.useState<IImageState>(initialState);

  React.useEffect(function onHookLoad() {
    setState({ image: undefined, status: LOADING });

    const imgEl = document.createElement("img");

    function handleLoad() {
      setState({ image: imgEl, status: LOADED });
    }

    function handleError() {
      setState({ image: undefined, status: FAILED });
    }

    if (crossOrigin) imgEl.crossOrigin = crossOrigin;
    imgEl.addEventListener("load", handleLoad);
    imgEl.addEventListener("error", handleLoad);
    imgEl.addEventListener("abort", handleError);
    imgEl.src = src;

    return function clearHook() {
      imgEl.removeEventListener("load", handleLoad);
      imgEl.removeEventListener("error", handleError);
      imgEl.removeEventListener("abort", handleError);
      setState(initialState);
    }
  }, [src, crossOrigin]);

  return [state];
}
