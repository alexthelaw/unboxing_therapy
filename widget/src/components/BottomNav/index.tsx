import { h } from 'preact';
import { useContext } from 'preact/hooks';

import { RouteLink, RouterContext } from '../../layout';

import styles from './style.css';

export default () => {
  const { route, setWithText } = useContext(RouterContext);

  const updateWithTextState = () => {
    setWithText(true);
  };

  return (
    <div className={styles.container}>
      <RouteLink href={'/offers'} className={`${styles.link_wrapper} ${route === '/offers' && styles.activeLink}`}>
        <div className={route === '/offers' ? styles.quests_image_active : styles.quests_image} />
        <p className={styles.p_0}>Offers</p>
      </RouteLink>
      <RouteLink
        href={'/prizes'}
        className={`${styles.link_wrapper} ${['/prizes'].includes(route) && styles.activeLink}`}
        onClick={updateWithTextState}
      >
        <div className={['/prizes'].includes(route) ? styles.perks_image_active : styles.perks_image} />
        <p className={styles.p_0}>Prizes</p>
      </RouteLink>
      <RouteLink
        href={'/profile'}
        className={`${styles.link_wrapper} ${route === '/profile' && styles.activeLink}`}
        onClick={updateWithTextState}
      >
        <div className={route === '/profile' ? styles.profile_image_active : styles.profile_image} />
        <p className={styles.p_0}>Profile</p>
      </RouteLink>
    </div>
  );
};
