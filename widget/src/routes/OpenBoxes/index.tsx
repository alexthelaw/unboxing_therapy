import { Fragment, h } from 'preact';
import { useCallback, useContext, useEffect, useState } from 'preact/compat';
import { RewardTags, tagToBigImage, tagToRewardedImage } from '@utils';
import { useWeb3 } from '@utils';
import clsx from 'clsx';
import { ethers } from 'ethers';

import Line from '../../../assets/icons/support/line.png';
import { RewardTag } from '../../components/RewardTag';
import P from '../../components/UI/P';
import { RUFFLE_TOKENS, SMART_ACCOUNT_ADDRESS } from '../../constants';
import { RouterContext } from '../../layout';
import { TUserRuffle } from '../../models';
import { useUser } from '../../Provider';
import { useSlideNotification } from '../../Provider/SlideNotification/useSlideNotification';
import styles from '../Auth/auth.css';
import Border from '../Auth/Border.svg';
import BorderColor from '../Auth/BorderColor.svg';

import Box from './Box.png';
import bgImage from './ClosedBg.png';
import openedBgImage from './OpenedBg.png';
import stylePage from './styles.css';

const OpenBoxesPage = () => {
  const { setRoute, setWithText } = useContext(RouterContext);
  const { generateRuffleCallData, generateExecuteRuffleFn, playUnbox2, getMetaData, playUnbox } = useWeb3();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isBgChanged, setIsBgChanged] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const { addTokenToRuffle, setIsClaimed } = useUser();
  const { setIsShown } = useSlideNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [claimedTokenstags, setClaimedTokensTags] = useState<RewardTags[]>([]);

  const clickHandler = async () => {
    setStep(prev => prev + 1);
    setLoading(true);
    try {
      if (!preCheck()) return;
      setDisabled(true);
      setIsOpened(false);
      setIsBgChanged(false);
      const sender = localStorage.getItem(SMART_ACCOUNT_ADDRESS);
      const ruffleCallData = generateRuffleCallData(sender as string);
      const executeData = generateExecuteRuffleFn(ruffleCallData);
      console.log(executeData);
      await playUnbox(sender as string, executeData);
      const data2 = await playUnbox2(sender as string);
      // console.log(data);
      console.log(data2);
      if (data2) {
        const event = data2.events.find((_event: any) => _event.event === 'Transfer');
        const [_from, _to, _tokenId] = event.args;
        const tokenId = (_tokenId as ethers.BigNumber).toNumber();
        const tag = await getMetaData(tokenId);
        console.log({ tag });
        await addTokenToRuffle({ isOpened: false, isClaimed: false, tokenId, tag, txHash: data2.transactionHash }, 0);
        setClaimedTokensTags(prevState => [...prevState, tag]);
        setDisabled(false);
        setLoading(false);
        setIsClaimed(tokenId, 0);
        setIsOpened(prev => !prev);
        setTimeout(() => setIsBgChanged(prev => !prev), 700);
      } else {
        setDisabled(false);
        setIsShown(true);
        setTimeout(() => setIsShown(false), 2000);
      }
    } catch (e) {
      console.log(e);
      setDisabled(false);
      setIsShown(true);
      setLoading(false);
      setTimeout(() => setIsShown(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  const openHandler = ({ withoutPreCheck = false }: { withoutPreCheck?: boolean }) => {
    if (!withoutPreCheck) preCheck();
    const data = JSON.parse(localStorage.getItem(RUFFLE_TOKENS) || '[]') as TUserRuffle[];
    const lastRuffleTokens = data.at(-1)?.tokens;
    setIsClaimed(lastRuffleTokens?.at(-1)?.tokenId || 0, 0);
    setIsOpened(prev => !prev);
    setTimeout(() => setIsBgChanged(prev => !prev), 700);
  };

  const [isAllClaimed, setIsAllClaimed] = useState<boolean>(false);

  const preCheckText = useCallback(() => {
    const text = `Open boxes - ${step}/3`;
    setWithText(text);
  }, [step]);

  const preCheck = useCallback(() => {
    preCheckText();
    if (step === 4) {
      setIsAllClaimed(true);
      setWithText(false);
      return false;
    }
    return true;
  }, [step]);

  const openHandlerClick = () => {
    openHandler({ withoutPreCheck: false });
  };

  useEffect(() => {
    preCheckText();
  }, []);

  useEffect(() => {
    console.log({ loading });
  }, [loading]);

  return (
    <div className={styles.container}>
      <div style={{ height: '0px' }} />
      {isAllClaimed ? (
        <Fragment>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              width: '100%',
            }}
          >
            <P textSize={'xl'} weight={'bold'}>
              Congratulations, winner!
            </P>
            <P style={{ color: '#707070', fontStyle: 'italic', fontWeight: 500 }}>Here are your rewards!</P>
            <img src={Line} alt={'Line'} />
            <div
              style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              {claimedTokenstags.map(tokens => (
                <img src={tagToRewardedImage[tokens]} style={{ width: '100px', aspectRatio: '1/1' }} />
              ))}
            </div>
            <div className={stylePage.btns}>
              <button className={stylePage.button} onClick={() => setRoute('/offers')}>
                Keep playing
              </button>
              <button className={stylePage.button_white} onClick={() => setRoute('/prizes')}>
                I'm good
              </button>
            </div>
          </div>
          <div />
        </Fragment>
      ) : (
        <Fragment>
          <div className={styles.bg}>
            <img
              src={isBgChanged ? openedBgImage : bgImage}
              alt={''}
              className={isBgChanged ? stylePage.image_appear : undefined}
            />
          </div>
          <div className={styles.logo_block}>
            {isBgChanged ? (
              <img
                src={tagToBigImage[claimedTokenstags.at(-1) || '']}
                alt={'tag'}
                className={clsx(styles.logo_image, stylePage.appear_token)}
              />
            ) : (
              <img src={Box} alt={'Box'} className={clsx(styles.logo_image, { [stylePage.disappear]: isOpened })} />
            )}
            <div className={`${styles.borders} ${loading && styles.rotate}`}>
              <img src={Border} alt={'Border'} className={`${styles.border_normal} ${styles.border_shadow}`} />
              <img src={Border} alt={'Border'} className={`${styles.border_normal_rotate} ${styles.border_shadow}`} />
              <img src={BorderColor} alt={'Border'} className={`${styles.border_normal} ${styles.border_color}`} />
              <img
                src={BorderColor}
                alt={'Border'}
                className={`${styles.border_normal_rotate} ${styles.border_color}`}
              />
            </div>
          </div>
          <div />
          <div className={stylePage.btns}>
            {isBgChanged ? <RewardTag type={claimedTokenstags.at(-1) || 'utnft'} /> : null}
            <button
              className={stylePage.button}
              onClick={!isBgChanged ? clickHandler : openHandlerClick}
              disabled={disabled}
            >
              {isOpened ? 'Next' : 'Open'}
            </button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default OpenBoxesPage;
