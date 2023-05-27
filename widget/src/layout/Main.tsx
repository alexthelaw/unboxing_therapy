import { Fragment, h } from 'preact';
import { CSSProperties, lazy, Suspense, useEffect, useState } from 'preact/compat';
import { useCallback, useContext } from 'preact/hooks';

import { GlobalsContext } from '../AppContext';
import OpenButton from '../components/OpenButton';
import Loader from '../components/UI/Loader';

const Routes = lazy(async () => await import('../layout/Routes'));

//todo please do not simplify routes for better bundle
import { useMediaQuery } from '../hooks/useMediaQuery';

import style from './main.css';

export const SCREEN_HEIGHT_MULTIPLIER = 0.85;


const Main = () => {
  const { widgetOpen, closeDelay, setClosedDelay } = useContext(GlobalsContext);

  return (
    <Fragment>
      {widgetOpen ? <OpenedWidgetState closeDelay={closeDelay} setCloseDelay={setClosedDelay} /> : <OpenButton />}
    </Fragment>
  );
};

const OpenedWidgetState = ({
  closeDelay,
  setCloseDelay,
}: {
  closeDelay: number;
  setCloseDelay: (delay: number) => void;
}) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const mt = window.innerHeight * 0.07;
  const height = window.innerHeight * SCREEN_HEIGHT_MULTIPLIER;

  const [unmount, setUnmount] = useState<boolean>(false);

  useEffect(() => {
    if (closeDelay) setUnmount(true);
    return () => setCloseDelay(0);
  }, [closeDelay]);

  const stylesInline: () => CSSProperties = useCallback(() => {
    const top = isMobile ? 'undefined' : `${mt}px`;
    const heightRoot = `${height}px`;
    const width = isMobile ? `${window.innerWidth - 20}px` : undefined;
    return { top, height: heightRoot, width };
  }, [isMobile]);

  return (
    <div className={`${style.root} ${unmount ? style.root_close : style.root_open}`} style={stylesInline()}>
      <Suspense fallback={<Loader />}>
        <Routes />
        <div id={'slideNotification'} />
      </Suspense>
    </div>
  );
};

export default Main;
