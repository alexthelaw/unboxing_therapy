import { h } from 'preact';
import { createPortal, useContext, useEffect } from 'preact/compat';
import clsx from 'clsx';

import { RouterContext } from '../../../layout';
import { useSlideNotification } from '../useSlideNotification';

import styles from './styles.css';

export const SlideComponent = () => {
  const { innerComponent, isShown, ref, setIsShown, setInnerComponent } = useSlideNotification();
  const { route } = useContext(RouterContext);
  const el = document.getElementById('slideNotification') as HTMLElement;
  if (!el) {
    return null;
  }

  useEffect(() => {
    if (!isShown && ref.current) {
      ref.current.onmouseleave = () => {
        setIsShown(false);
        setInnerComponent(null);
      };
      ref.current.onmouseenter = () => {
        setIsShown(true);
      };
    }
  }, [isShown]);

  return createPortal(
    <div
      ref={ref}
      className={clsx(styles.wrapper, {
        [styles.open]: isShown,
        [styles.open_small]: isShown && route === '/skillpage',
      })}
    >
      {innerComponent}
    </div>,
    el,
  );
};
