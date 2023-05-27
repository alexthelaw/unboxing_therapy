import { JSX, RefObject } from 'preact';

export type SlideNotificationConfigType = {
  isShown: boolean;
  setIsShown: (is: boolean) => void;
  innerComponent: JSX.Element | null;
  setInnerComponent: (component: JSX.Element | null) => void;
  ref: RefObject<HTMLDivElement>;
};
