import { h, JSX } from 'preact';

import P from '../../UI/P';

import styles from './settingsCard.css';

interface SettingsCardProps {
  title: string;
  icon: JSX.Element;
  onClick?: (args?: unknown) => void;
}

export const SettingsCard = ({ title, icon, onClick }: SettingsCardProps) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.info}>
        <P weight={'bold'} color={'white'}>
          {'Sign in with '}
          {title}
        </P>
      </div>
      {icon}
    </div>
  );
};
