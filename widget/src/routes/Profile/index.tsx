import { h } from 'preact';
import { useContext, useEffect, useState } from 'preact/compat';
import { copy, startAndEnd } from '@utils';
import { useWeb3 } from '@utils';
import { getAccount } from 'web3-tools-easy';

import addressImage from '../../../assets/icons/support/address.svg';
import topImage from '../../../assets/icons/support/top.svg';
import walletImage from '../../../assets/icons/support/wallet.svg';
import { CopyIcon } from '../../components/UI/icons';
import P from '../../components/UI/P';
import { SMART_ACCOUNT_ADDRESS } from '../../constants';
import { RouterContext } from '../../layout';

import styles from './profile.css';

const ProfilePage = () => {
  const { setRoute, setWithText } = useContext(RouterContext);
  const { getBalance } = useWeb3();
  const [address, setAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('0.0');
  const [topUpBalance, setTopUpBalance] = useState<string>('');

  const logout = () => {
    localStorage.clear();
    setRoute('/');
    setWithText(false);
  };
  const copyHandle = async () => {
    await copy(topUpBalance);
  };

  useEffect(() => {
    const addr = localStorage.getItem(SMART_ACCOUNT_ADDRESS);
    const updateBalance = async () => {
      const bal = await getBalance(addr as string);
      setBalance(bal);
    };

    (async () => {
      setAddress(await getAccount());
      setTopUpBalance(addr as string);
      await updateBalance();
    })();

    const updBal = setInterval(async () => await updateBalance(), 5000);

    return () => clearInterval(updBal);
  }, []);

  return (
    <div className={styles.container}>
      <div style={{ marginTop: '105px' }} />
      <div className={styles.wrapper}>
        <img src={addressImage} alt={''} />
        <P textSize={'xl'} weight={'bold'} className={styles.column}>
          Your address: <span className={styles.green_text}>{startAndEnd(address, 6)}</span>
        </P>
      </div>
      <div className={styles.wrapper}>
        <img src={walletImage} alt={''} />
        <P textSize={'xl'} weight={'bold'} style={{ width: '100%' }} className={styles.column}>
          Your UT balance: <span className={styles.green_text}>{balance} BIT</span>
        </P>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.column}>
          <div className={styles.row} style={{ gap: '20px' }}>
            <img src={topImage} alt={''} />
            <P textSize={'xl'} weight={'bold'} style={{ width: '100%' }} className={styles.column}>
              Top up:{' '}
              <span
                className={styles.green_text}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '11px' }}
              >
                {startAndEnd(topUpBalance, 6)} <CopyIcon onClick={copyHandle} />
              </span>
            </P>
          </div>
          <div className={styles.qr_code_wrapper}>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${topUpBalance}`}
              alt={'QR code'}
            />
          </div>
        </div>
      </div>
      <div className={styles.btn}>
        <button onClick={logout}>Log Out</button>
      </div>
      <div style={{ marginBottom: '150px' }} />
    </div>
  );
};

export default ProfilePage;
