function unbindEvents(img: HTMLImageElement): void {
  img.onload = null;
  img.onerror = null;
  img.onabort = null;

  try {
    delete img.src;
  } catch(e) {}
}

export default function loadImage(src: string, crossOrigin?: string | null): Promise<any> {
  const img = new Image();

  if (crossOrigin) img.crossOrigin = crossOrigin;

  return new Promise((resolve, reject) => {
    function handleLoad(ev: Event) {
      unbindEvents(img);
      resolve(ev.target || ev.srcElement);
    }

    function handleError(err: Event) {
      unbindEvents(img);
      reject(err);
    }

    img.onload = handleLoad;
    img.onerror = handleError;
    img.onabort = handleError;
    img.src = src;
  });
}