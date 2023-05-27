import { Fragment, h } from 'preact';
import { useState } from 'preact/compat';
import clsx from 'clsx';

import { tagToBigImage } from '../../utils/someTo';
import styles from '../Auth/auth.css';
import Border from '../Auth/Border.svg';
import BorderColor from '../Auth/BorderColor.svg';

import Box from './Box.png';
import bgImage from './ClosedBg.png';
import openedBgImage from './OpenedBg.png';
import stylePage from './styles.css';

const OpenBoxesPage = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isBgChanged, setIsBgChanged] = useState<boolean>(false);

  const clickHandler = () => {
    setIsOpened(!isOpened);
    setTimeout(() => setIsBgChanged(!isBgChanged), 700);
  };

  return (
    <div className={styles.container}>
      <div style={{ height: '0px' }} />
      <div className={styles.bg}>
        <img
          src={isBgChanged ? openedBgImage : bgImage}
          alt={''}
          className={isBgChanged ? stylePage.image_appear : undefined}
        />
      </div>
      <div className={styles.logo_block}>
        {isBgChanged ? (
          <img src={tagToBigImage.utnft} alt={'tag'} className={clsx(styles.logo_image, stylePage.appear_token)} />
        ) : (
          <img src={Box} alt={'Box'} className={clsx(styles.logo_image, { [stylePage.disappear]: isOpened })} />
        )}
        <Fragment>
          <img src={Border} alt={'Border'} className={`${styles.border_normal} ${styles.border_shadow}`} />
          <img src={Border} alt={'Border'} className={`${styles.border_normal_rotate} ${styles.border_shadow}`} />
          <img src={BorderColor} alt={'Border'} className={`${styles.border_normal} ${styles.border_color}`} />
          <img src={BorderColor} alt={'Border'} className={`${styles.border_normal_rotate} ${styles.border_color}`} />
        </Fragment>
      </div>
      <div />
      <div className={stylePage.btns}>
        <button className={stylePage.button} onClick={clickHandler}>
          {isOpened ? 'Next' : 'Open'}
        </button>
      </div>
    </div>
  );
};

export default OpenBoxesPage;
