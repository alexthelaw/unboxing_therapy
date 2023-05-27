import { h } from 'preact';
import { FC } from 'preact/compat';

import { STREAK_MULTIPLIER } from '../../../constants';
import { TSkill } from '../../../services/types';
import { SkillToImage } from '../../../utils/someTo';
import P from '../../UI/P';

import styles from './styles.css';

type BonusNotificationProps = {
  mpostTokensBonus: number;
  skills: TSkill[];
};

export const BonusNotification: FC<BonusNotificationProps> = ({ mpostTokensBonus, skills }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top_wrapper}>
        <P color={'gold'} textSize={'xl'} weight={'bold'}>
          BONUS
        </P>
        <div className={styles.bonus_wrapper}>
          <P color={'gold'}>+ {mpostTokensBonus} MPST</P>
          {skills.map(s => (
            <div>
              <P style={{ width: 'fit-content', display: 'flex', gap: '4px' }}>
                + {s.skillPoints * STREAK_MULTIPLIER}
                <div
                  style={{ background: `url(${SkillToImage[s.skillTag]}) center/cover` }}
                  className={styles.skill_image_wrapper}
                />
              </P>
            </div>
          ))}
        </div>
      </div>
      <div>
        <P>Complete quest everyday for 30 days.</P>
        <P>
          And get extra <span>+25% bonus</span>
        </P>
      </div>
    </div>
  );
};
