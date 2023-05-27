import { Fragment, h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { connect, getAccount } from 'web3-tools-easy';

import { AuthListener } from '../../components/AuthListener';
import { SettingsCard } from '../../components/cards/SettingsCard';
import { MetamaskIcon, WalletConnectIcon } from '../../components/UI/icons';
import Loader from '../../components/UI/Loader';
import P from '../../components/UI/P';
import { RouterContext } from '../../layout';

import styles from './auth.css';
import bgImage from './BG.png';
import Border from './Border.svg';
import BorderColor from './BorderColor.svg';
import HeartImage from './heart.png';

export default () => {
  const router = useContext(RouterContext);
  const [loading, setLoading] = useState<boolean>(false);

  const auth = async () => {
    setLoading(true);
    await connect();
    if (await getAccount()) {
      await authHandler();
    }
    setLoading(false);
  };

  const authHandler = async () => {
    router.setRoute('/offers');
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.bg}>
        <img src={bgImage} alt={''} />
      </div>
      <div />
      <P weight={'bold'} textSize={'xl'} className={styles.text}>
        Unboxing Therapy
      </P>
      <div className={styles.logo_block}>
        <img src={HeartImage} alt={'Heart'} className={styles.logo_image} />
        <Fragment>
          <img src={Border} alt={'Border'} className={`${styles.border_normal} ${styles.border_shadow}`} />
          <img src={Border} alt={'Border'} className={`${styles.border_normal_rotate} ${styles.border_shadow}`} />
          <img src={BorderColor} alt={'Border'} className={`${styles.border_normal} ${styles.border_color}`} />
          <img src={BorderColor} alt={'Border'} className={`${styles.border_normal_rotate} ${styles.border_color}`} />
        </Fragment>
      </div>
      <P weight={'bold'} textSize={'l'} className={styles.text_small}>
        Join now, try your luck and gain exclusive Prizes!
      </P>
      <div style={{ width: '100%', gap: '20px', display: 'flex', flexDirection: 'column' }}>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <SettingsCard title="Metamask" icon={<MetamaskIcon />} onClick={auth} />
            <SettingsCard title="WalletConnect" icon={<WalletConnectIcon />} onClick={auth} />
          </Fragment>
        )}
      </div>
      <AuthListener onSuccess={authHandler} />
    </div>
  );
};
