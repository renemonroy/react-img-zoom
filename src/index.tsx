import * as React from "react";
import { IImgZoomProps } from "./index.types";
import useLoadImage from "./utils/useLoadImage";

// https://picsum.photos/id/237/536/354

export default function ImgZoom(props: IImgZoomProps): JSX.Element {
  const { width, height, src } = props;

  const [imgStatus, imgSrc] = useLoadImage(src);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [, setCtx] = React.useState<CanvasRenderingContext2D | null>(null);

  React.useEffect((): void => {
    if (imgStatus === "LOADED") {
      const mainCtx = canvasRef.current!.getContext(
        "2d",
      ) as CanvasRenderingContext2D | null;
      if (mainCtx != null) mainCtx.drawImage(imgSrc, 0, 0, width, height);
      setCtx(mainCtx);
    }
  }, [imgStatus]);

  const w = `${width}px`;
  const h = `${height}px`;

  return (
    <div className="img-zoom" style={{ width: w, height: h }}>
      <canvas ref={canvasRef} width={w} height={h} />
    </div>
  );
}
