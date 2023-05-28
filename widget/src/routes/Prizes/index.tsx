import { Fragment, h } from 'preact';
import { RewardTags, startAndEnd, tagToImage, tagToName } from '@utils';

import P from '../../components/UI/P';
import { useUser } from '../../Provider';

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
  const { userRuffles } = useUser();

  const getToken = (tag: RewardTags): string | undefined => {
    return userRuffles[0]?.tokens.filter(t => t.tag === tag && t.txHash)[0]?.txHash;
  };

  return (
    <div className={styles.container}>
      <div style={{ height: '143px' }} />
      <div className={styles.wrapper}>
        {prizesArray.map(prize => (
          <div className={styles.prize}>
            <div className={styles.left}>
              <img src={tagToImage[prize.tag]} style={{ width: '77px', aspectRatio: '1/1' }} />
              <div style={{ textAlign: 'left' }}>
                <P className={styles.text}>{tagToName[prize.tag]}</P>
                <a
                  style={{ color: '#4DC9AC' }}
                  href={`https://explorer.testnet.mantle.xyz/tx/${getToken(prize.tag)}`}
                  target={'_blank'}
                >
                  {getToken(prize.tag) ? (
                    <Fragment>
                      Your tx:
                      {startAndEnd(getToken(prize.tag), 6)}
                    </Fragment>
                  ) : null}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrizesPage;
