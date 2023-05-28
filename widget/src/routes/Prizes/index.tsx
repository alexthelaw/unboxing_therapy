import { h } from 'preact';
import { RewardTags, tagToImage, tagToName } from '@utils';

import P from '../../components/UI/P';

import styles from './prizes.css';

type PrizesType = {
  tag: RewardTags;
  isClaimed: boolean;
};

const prizesArray: PrizesType[] = [
  {
    tag: '0inch',
    isClaimed: false,
  },
  {
    tag: 'tether',
    isClaimed: false,
  },
  {
    tag: 'utnft',
    isClaimed: false,
  },
];

const PrizesPage = () => {
  return (
    <div className={styles.container}>
      <div style={{ height: '143px' }} />
      <div className={styles.wrapper}>
        {prizesArray.map(prize => (
          <div className={styles.prize}>
            <div className={styles.left}>
              <img src={tagToImage[prize.tag]} style={{ width: '77px', aspectRatio: '1/1' }} />
              <P className={styles.text}>{tagToName[prize.tag]}</P>
            </div>
            {prize.isClaimed ? <P className={styles.text}>Claimed</P> : <button disabled>Claim</button>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrizesPage;
