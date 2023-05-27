import { h } from 'preact';
import { FC, useMemo } from 'preact/compat';

import { useUser } from '../../../Provider';
import { SkillToImage } from '../../../utils/someTo';
import P from '../../UI/P';
import { UserProgressLine } from '../../UI/UserProgressLine';

import styles from './styles.css';

type SkillNotificationProps = {
  skillTag: string;
};

export const SkillNotification: FC<SkillNotificationProps> = ({ skillTag }) => {
  const { skillsConfigurations, userSkills } = useUser();
  const { name, levels } = skillsConfigurations[skillTag];
  const userProgress = userSkills.find(s => s.skillTag === skillTag);

  const maxLevelPoints = useMemo(() => {
    return levels[userProgress?.level || 1].maxLevelPoints;
  }, [levels, userProgress]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.img_wrapper}>
        <img src={SkillToImage[skillTag]} alt={`${name} image`} />
      </div>
      <div className={styles.data_wrapper}>
        <P className={styles.name}>{name}</P>
        <UserProgressLine
          currLevel={userProgress?.level || 0}
          points={userProgress?.points || 0}
          maxLevelPoints={maxLevelPoints}
        />
      </div>
    </div>
  );
};
