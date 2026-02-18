export interface CursorSet {
  normal: string | null;
  pointing: string | null;
  loading: string | null;
  clicking: string | null;
  typing: string | null;
}

export enum CursorType {
  NORMAL = 'normal',
  POINTING = 'pointing',
  LOADING = 'loading',
  CLICKING = 'clicking',
  TYPING = 'typing',
}

export interface GeneratedImage {
  type: CursorType;
  base64: string;
}