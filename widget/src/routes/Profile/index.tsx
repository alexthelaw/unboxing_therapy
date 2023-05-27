import { h } from 'preact';
import { useEffect, useState } from 'preact/compat';
import { startAndEnd } from '@utils';
import { getAccount } from 'web3-tools-easy';

import P from '../../components/UI/P';

import styles from './profile.css';

const ProfilePage = () => {
  const [address, setAddress] = useState<string>('');
  const [balance] = useState<string>('0.2');
  const [topUpBalance] = useState<string>('0x018A81aaF8b984d0f0d962580D476505d4130b94');

  useEffect(() => {
    (async () => setAddress(await getAccount()))();
  }, []);

  return (
    <div className={styles.container}>
      <div style={{ height: '105px' }} />
      <P textSize={'xl'} weight={'bold'} style={{ width: '100%' }}>
        Your address: <span className={styles.green_text}>{startAndEnd(address, 6)}</span>
      </P>
      <P textSize={'xl'} weight={'bold'} style={{ width: '100%' }}>
        Your UT balance: <span className={styles.green_text}>{balance} BIT</span>
      </P>
      <P textSize={'xl'} weight={'bold'} style={{ width: '100%' }}>
        Top up: <span className={styles.green_text}>{startAndEnd(topUpBalance, 6)}</span>
      </P>
      <div className={styles.qr_code_wrapper}>
        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${topUpBalance}`} alt={'QR code'} />
      </div>
      <div />
    </div>
  );
};

export default ProfilePage;
