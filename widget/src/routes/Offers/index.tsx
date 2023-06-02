import { Fragment, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/compat';
import { copy, startAndEnd } from '@utils';
import { useWeb3 } from '@utils';

import { OfferPageCard } from '../../components/cards/OfferPageCard';
import { CopyIcon } from '../../components/UI/icons';
import P from '../../components/UI/P';
import { SMART_ACCOUNT_ADDRESS } from '../../constants';
import { RouterContext } from '../../layout';
import { useSlideNotification } from '../../Provider/SlideNotification/useSlideNotification';

import styles from './offers.css';
import PreviewImage from './Preview.png';

const OffersPage = () => {
  const { setWithText } = useContext(RouterContext);
  const [preview, setPreview] = useState<boolean>(true);

  const closePreview = () => {
    setWithText(true);
    setPreview(false);
  };

  useEffect(() => {
    setWithText(false);
  }, []);

  return (
    <Fragment>
      <div className={styles.container}>
        {preview ? (
          <Fragment>
            <img src={PreviewImage} style={{ height: '800px' }} />
            <div className={styles.overlay_button}>
              <button onClick={closePreview}>Play now</button>
            </div>
          </Fragment>
        ) : (
          <Page />
        )}
      </div>
    </Fragment>
  );
};

const Page = () => {
  return (
    <Fragment>
      <div style={{ height: '140px' }} />
      <div className={styles.data_container}>
        <P textSize={'l'} style={{ textAlign: 'center', margin: 0 }}>
          Place 60 BIT bet to open 3 captivating boxes with treasures
        </P>
        <p className={styles.green_text}>Fortune favours the brave!</p>
        <OfferPageCard />
        <UserData />
      </div>
      <div style={{ marginBottom: '150px' }} />
    </Fragment>
  );
};

const UserData = () => {
  const { setIsShown } = useSlideNotification();
  const { getBalance } = useWeb3();
  const { setRoute } = useContext(RouterContext);
  const [topUpBalance] = useState<string>(localStorage.getItem(SMART_ACCOUNT_ADDRESS) as string);

  const goButtonClick = async () => {
    const sender = localStorage.getItem(SMART_ACCOUNT_ADDRESS);
    const d = await getBalance(sender as string);
    if (Number(d) < 20) {
      setIsShown(true);
      setTimeout(() => setIsShown(false), 2000);
      return;
    }
    setRoute('/openBoxes');
  };

  const copyHandle = async () => {
    await copy(topUpBalance);
  };

  return (
    <div className={styles.data_wrapper}>
      <div>
        <div>
          <P weight={'bold'}>Top up this address to start</P>
          <P
            weight={'bold'}
            style={{ color: '#154215', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '11px' }}
          >
            {startAndEnd(topUpBalance, 6)}
            <CopyIcon onClick={copyHandle} />
          </P>
        </div>
        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${topUpBalance}`} alt={'QR code'} />
      </div>
      <button onClick={goButtonClick}>Get started!</button>
    </div>
  );
};

export default OffersPage;
