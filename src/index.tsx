import * as React from "react";

import { IImgZoomProps } from "./index.types";
import { useImage } from "./useImage";

// https://picsum.photos/id/237/536/354

export default function ImgZoom(props: IImgZoomProps): JSX.Element {
  const { width, height, src } = props;

  const [{ image, status }] = useImage(src);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [, setCtx] = React.useState<CanvasRenderingContext2D | null>(null);

  React.useEffect((): void => {
    if (status === "LOADED" && image !== undefined) {
      const mainCtx = canvasRef.current!.getContext(
        "2d",
      ) as CanvasRenderingContext2D | null;
      if (mainCtx != null) mainCtx.drawImage(image, 0, 0, width, height);
      setCtx(mainCtx);
    }
  }, [status]);

  const w = `${width}px`;
  const h = `${height}px`;

  return (
    <div className="img-zoom" style={{ width: w, height: h }}>
      <canvas ref={canvasRef} width={w} height={h} />
    </div>
  );
}
