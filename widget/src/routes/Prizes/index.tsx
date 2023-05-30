import { Fragment, h } from 'preact';
import { startAndEnd, tagToImage, tagToName } from '@utils';

import P from '../../components/UI/P';
import { useUser } from '../../Provider';

import styles from './prizes.css';

const PrizesPage = () => {
  const { userRuffles } = useUser();

  return (
    <div className={styles.container}>
      <div style={{ marginTop: '143px' }} />
      <div className={styles.wrapper}>
        {!userRuffles || !userRuffles[0] || !userRuffles[0].tokens ? <P>You prizes will appear here</P> : null}
        {userRuffles[0].tokens.map(prize =>
          prize.txHash ? (
            <div className={styles.prize}>
              <div className={styles.left}>
                <img src={tagToImage[prize.tag]} style={{ width: '77px', aspectRatio: '1/1' }} />
                <div style={{ textAlign: 'left' }}>
                  <P className={styles.text}>{tagToName[prize.tag]}</P>
                  <a
                    style={{ color: '#4DC9AC' }}
                    href={`https://explorer.testnet.mantle.xyz/tx/${prize.txHash}`}
                    target={'_blank'}
                  >
                    <Fragment>
                      Your tx:
                      {startAndEnd(prize.txHash, 6)}
                    </Fragment>
                  </a>
                </div>
              </div>
            </div>
          ) : null,
        )}
      </div>
      <div style={{ marginBottom: '150px' }} />
    </div>
  );
};

export default PrizesPage;
