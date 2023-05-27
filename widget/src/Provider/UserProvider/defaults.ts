import { QuestProgressEnum, QuestsStatusesEnum, UserQuestProgressDataType } from '../../services/types';

export const defaultsUserQuestProgress = (isStarted: boolean): UserQuestProgressDataType => {
  return {
    kind: QuestProgressEnum.daily,
    status: isStarted ? QuestsStatusesEnum.started : QuestsStatusesEnum.pendingToStart,
    lastQuestPassingCheckStatus: null,
    dailyOptions: null,
  };
};
