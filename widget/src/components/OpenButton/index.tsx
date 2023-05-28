import { h } from 'preact';
import { CSSProperties } from 'preact/compat';
import { useCallback, useContext } from 'preact/hooks';

import { GlobalsContext } from '../../AppContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';

import Heart from './heart.svg';
import styles from './openButton.css';

const Index = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { setWidgetOpen, setClosedDelay } = useContext(GlobalsContext);

  const openHandler = async () => {
    setWidgetOpen(true);
    setClosedDelay(0);
  };

  const mt = window.innerHeight * 0.1;

  const stylesInline: () => CSSProperties = useCallback(() => {
    const background = '';
    return {
      position: 'fixed',
      right: isMobile ? '50%' : '95px',
      top: `${mt}px`,
      transform: isMobile ? 'translate(50%,-50%)' : undefined,
      background,
    };
  }, [isMobile]);

  return (
    <div onClick={openHandler} className={styles.container} style={stylesInline()}>
      <div className={styles.inner}>
        <img src={Heart} className={styles.img} />
        <p className={styles.text}>Unboxing Therapy</p>
      </div>
    </div>
  );
};

export default Index;
