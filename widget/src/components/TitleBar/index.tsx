import { Fragment, h } from 'preact';
import { useContext, useMemo, useState } from 'preact/hooks';
import clsx from 'clsx';

import { GlobalsContext } from '../../AppContext';
import { RouterContext } from '../../layout';
import { routeToTitle } from '../../utils/someTo';
import P from '../UI/P';

import BackIcon from './Back.svg';
import CloseIcon from './CloseIcon.svg';
import style from './titlebar.css';

const Index = () => {
  const { setWidgetOpen, setClosedDelay } = useContext(GlobalsContext);
  const { route, back, withText } = useContext(RouterContext);
  const [textOut, setTextOut] = useState<boolean>(true);

  const text = useMemo(() => {
    return (withText && routeToTitle[route]) || '';
  }, [route, withText]);

  const closeWidget = () => {
    setClosedDelay(0.8);
    setTimeout(() => setTextOut(false), 400);
    setTimeout(() => setWidgetOpen(false), 800);
  };

  const goBack = () => {
    back();
  };

  return (
    <div className={clsx(style.root, { [style.root_transparent]: !withText })}>
      {['/skillpage', '/perkpage'].includes(route) ? (
        <img className={style.profile_image} src={BackIcon} alt={'Back'} onClick={goBack} style={{ left: '12px' }} />
      ) : null}
      <Fragment>
        {textOut && (
          <P textSize={'xl'} weight={'bold'}>
            {text}
          </P>
        )}
      </Fragment>
      <img className={style.profile_image} src={CloseIcon} alt={'Close'} onClick={closeWidget} />
    </div>
  );
};

export default Index;
