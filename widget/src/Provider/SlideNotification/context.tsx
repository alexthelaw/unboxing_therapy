import { createContext, h, JSX } from 'preact';
import { FC, PropsWithChildren, useRef, useState } from 'preact/compat';

import routeStyles from '../../layout/routes.css';

import { SlideComponent } from './SlideComponent';
import { SlideNotificationConfigType } from './types';

export const SlideNotificationContext = createContext<SlideNotificationConfigType>({} as SlideNotificationConfigType);

export const SlideNotificationProvider: FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isShown, setIsShown] = useState<boolean>(false);
  const [innerComponent, setInnerComponent] = useState<JSX.Element | null>(null);

  return (
    <SlideNotificationContext.Provider value={{ isShown, setIsShown, innerComponent, setInnerComponent, ref }}>
      <div className={routeStyles.appear_wrapper}>
        {children}
        <SlideComponent />
      </div>
    </SlideNotificationContext.Provider>
  );
};
