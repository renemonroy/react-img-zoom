import * as React from "react";

import { IImgZoomProps } from "./index.types";
import { useImage } from "./useImage";

export default function ImgZoom(props: IImgZoomProps): JSX.Element {
  const { width, height, src } = props;

  const [{ image, status }] = useImage(src);
  const bgRef = React.useRef<HTMLCanvasElement>(null);
  const fgRef = React.useRef<HTMLCanvasElement>(null);
  const [fgCtx, setFgCtx] = React.useState<CanvasRenderingContext2D | null>(
    null,
  );

  const percent = 0.5;

  React.useEffect((): void => {
    if (status === "LOADED" && image !== undefined) {
      const bgContext = bgRef.current!.getContext(
        "2d",
      ) as CanvasRenderingContext2D | null;
      const fgContext = fgRef.current!.getContext(
        "2d",
      ) as CanvasRenderingContext2D | null;
      if (bgContext != null) bgContext.drawImage(image, 0, 0, width, height);
      setFgCtx(fgContext);
    }
  }, [status]);

  function handleMouseMove(e: React.MouseEvent): void {
    const x: number = e.clientX;
    const y: number = e.clientY;

    if (image && bgRef.current) {
      const sWidth = image.width * percent;
      const sHeight = image.height * percent;
      fgCtx?.drawImage(
        bgRef.current,
        Math.min(Math.max(0, x - sWidth / 2), sWidth),
        Math.min(Math.max(0, y - sHeight / 2), sHeight),
        sWidth,
        sHeight,
        0,
        0,
        width,
        height,
      );
    }
  }

  function handleMouseOut() {
    if (image && bgRef.current) {
      fgCtx?.clearRect(0, 0, width, height);
    }
  }

  const w = `${width}px`;
  const h = `${height}px`;

  return (
    <div
      className="img-zoom"
      style={{ width: w, height: h, position: "relative" }}
    >
      <canvas
        ref={bgRef}
        width={w}
        height={h}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
        style={{ zIndex: 0 }}
      />
      <canvas
        ref={fgRef}
        width={w}
        height={h}
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />
    </div>
  );
}
