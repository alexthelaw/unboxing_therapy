import { h } from 'preact';

import { RewardTag } from '../../components/RewardTag';
import P from '../../components/UI/P';
import { RewardTags } from '../../utils/someTo';

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
    isClaimed: true,
  },
];

const PrizesPage = () => {
  return (
    <div className={styles.container}>
      <div style={{ height: '143px' }} />
      <div>
        {prizesArray.map(prize => (
          <div className={styles.prize}>
            <RewardTag type={prize.tag} />
            {prize.isClaimed ? <P className={styles.text}>Claimed</P> : <button>Claim</button>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrizesPage;
