import { h } from 'preact';
import { createPortal, useEffect } from 'preact/compat';
import clsx from 'clsx';

import { useSlideNotification } from '../useSlideNotification';

import styles from './styles.css';

export const SlideComponent = () => {
  const { isShown, ref, setIsShown, setInnerComponent } = useSlideNotification();
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
      })}
    >
      {isShown && <span style={{ marginBottom: '50px' }}>Insufficient balance</span>}
    </div>,
    el,
  );
};
