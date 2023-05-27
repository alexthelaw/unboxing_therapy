import { h } from 'preact';

import { RewardTags, tagToName } from '../../../utils/someTo';
import { RewardTag } from '../../RewardTag';
import P from '../../UI/P';

import styles from './styles.css';

export const OfferPageCard = () => {
  return (
    <div className={styles.wrapper}>
      <P weight={'bold'} textSize={'l'} color={'white'}>
        Prizes to win
      </P>
      <div className={styles.rewards_wrapper}>
        {Object.keys(tagToName).map((reward: RewardTags) => (
          <RewardTag type={reward} withBox withText />
        ))}
      </div>
    </div>
  );
};
