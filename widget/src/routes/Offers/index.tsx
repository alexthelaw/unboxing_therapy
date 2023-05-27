import { Fragment, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/compat';
import { copy, startAndEnd } from '@utils';

import { OfferPageCard } from '../../components/cards/OfferPageCard';
import { CopyIcon } from '../../components/UI/icons';
import P from '../../components/UI/P';
import { RouterContext } from '../../layout';

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
      <div style={{ height: '70px' }} />
      <div className={styles.data_container}>
        <P textSize={'l'} style={{ textAlign: 'center' }}>
          Place 20 BIT bet to open 3 captivating boxes with treasures
        </P>
        <p className={styles.green_text}>Fortune favours the brave!</p>
        <OfferPageCard />
        <UserData />
      </div>
      <div />
    </Fragment>
  );
};

const UserData = () => {
  const { setRoute } = useContext(RouterContext);
  const [topUpBalance] = useState<string>('0x018A81aaF8b984d0f0d962580D476505d4130b94');

  const goButtonClick = () => {
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
            style={{ color: '#4DC9AC', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '11px' }}
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
