import { h } from 'preact';
import { FC } from 'preact/compat';

import { RewardTags, tagToImage, tagToName, tagToSubName } from '../../utils/someTo';

import styles from './styles.css';

type RewardTagProps = {
  type: RewardTags;
  withBox?: boolean;
  withText?: boolean;
};

export const RewardTag: FC<RewardTagProps> = ({ type, withBox, withText }) => {
  return (
    <div className={styles.wrapper} style={withBox ? { marginLeft: '69px' } : undefined}>
      {withBox && <div className={styles.box} />}
      <img src={tagToImage[type]} alt={`${type} image`} />
      <p>{tagToName[type]}</p>
      {withText && <div className={styles.subname}>{tagToSubName[type]}</div>}
    </div>
  );
};
