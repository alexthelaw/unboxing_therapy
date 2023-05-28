import { Fragment, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/compat';
import { copy, startAndEnd } from '@utils';
import { useWeb3 } from '@utils';
import { ethers } from 'ethers';

import { OfferPageCard } from '../../components/cards/OfferPageCard';
import { CopyIcon } from '../../components/UI/icons';
import P from '../../components/UI/P';
import { SMART_ACCOUNT_ADDRESS } from '../../constants';
import { RouterContext } from '../../layout';
import { useUser } from '../../Provider';
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
      <div style={{ height: '70px' }} />
      <div className={styles.data_container}>
        <P textSize={'l'} style={{ textAlign: 'center', margin: 0 }}>
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
  const { userRuffles, addTokenToRuffle } = useUser();
  const { setIsShown } = useSlideNotification();
  const { generateRuffleCallData, getBalance, generateExecuteRuffleFn, playUnbox2, getMetaData, playUnbox } = useWeb3();
  const { setRoute } = useContext(RouterContext);
  const [topUpBalance] = useState<string>(localStorage.getItem(SMART_ACCOUNT_ADDRESS) as string);

  const goButtonClick = async () => {
    const sender = localStorage.getItem(SMART_ACCOUNT_ADDRESS);
    const d = await getBalance(sender as string);
    const notFinishedRuffle = userRuffles.find(
      _ruffle => _ruffle.tokens.length && _ruffle.tokens.length !== 3 && _ruffle.tokens.length % 3 !== 0,
    );
    if (notFinishedRuffle && notFinishedRuffle.tokens.some(t => !t.isOpened)) {
      console.log(notFinishedRuffle);
      setRoute('/openBoxes');
      return;
    }
    if (Number(d) < 20) {
      setIsShown(true);
      setTimeout(() => setIsShown(false), 2000);
      return;
    }
    const ruffleCallData = generateRuffleCallData(sender as string);
    const executeData = generateExecuteRuffleFn(ruffleCallData);
    await playUnbox(sender as string, executeData);
    console.log(executeData);
    const data2 = await playUnbox2(sender as string);
    // console.log(data);
    console.log(data2);
    if (data2) {
      const event = data2.events.find((_event: any) => _event.event === 'Transfer');
      const [_from, _to, _tokenId] = event.args;
      const tokenId = (_tokenId as ethers.BigNumber).toNumber();
      const ruffleId = notFinishedRuffle ? notFinishedRuffle.id : userRuffles.at(-1)?.id || 0;
      const tag = await getMetaData(tokenId);
      console.log({ tag });
      console.log('tx hash', data2.transactionHash);
      addTokenToRuffle({ isOpened: false, isClaimed: false, tokenId, tag, txHash: data2.transactionHash }, ruffleId);
      setRoute('/openBoxes');
    } else {
      setIsShown(true);
      setTimeout(() => setIsShown(false), 2000);
      return;
    }
  };

  const copyHandle = async () => {
    await copy(topUpBalance);
  };

  useEffect(() => {
    const a = async () => {
      console.log('send');
      const sender = localStorage.getItem(SMART_ACCOUNT_ADDRESS);
      const d = await getBalance(sender as string);
      console.log(d);
    };

    a();
  }, []);

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
