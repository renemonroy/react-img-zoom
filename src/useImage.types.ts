export type TImage = HTMLImageElement | undefined;

export type TStatus = "LOADING" | "LOADED" | "FAILED" | "NONE";

export interface IImageState {
  image: TImage,
  status: TStatus
};
