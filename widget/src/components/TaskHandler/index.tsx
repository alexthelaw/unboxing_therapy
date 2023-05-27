import { StateUpdater, useContext, useEffect } from 'preact/compat';
import { ServiceContext, sleep } from '@utils';

import { RouterContext } from '../../layout';
import { TasksStatuses } from '../../services/types';

export const TaskHandler = ({
  taskId,
  removeTaskId = () => undefined,
  updateData,
  errorHandler,
  successHandler,
  removeLoading,
  tokensAmount,
}: {
  taskId: number;
  tokensAmount: number;
  removeTaskId: StateUpdater<undefined>;
  updateData: () => Promise<void>;
  errorHandler: StateUpdater<boolean>;
  successHandler: StateUpdater<boolean>;
  removeLoading: StateUpdater<boolean>;
}) => {
  const { getTask } = useContext(ServiceContext);
  const { setTokenValue, setLightBalance } = useContext(RouterContext);
  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await getTask({ taskId });
      if (data.data?.getTask) {
        if (![TasksStatuses.PENDING, TasksStatuses.IN_PROGRESS].includes(data.data.getTask.status)) {
          removeLoading(false);
          if (data.data.getTask.status === TasksStatuses.SUCCESS) {
            const status = JSON.parse(data.data.getTask.result)?.summaryStatus;
            const result = JSON.parse(data.data.getTask.result)?.summaryResult;
            const noError = JSON.parse(data.data.getTask.result)?.error === null;
            if (status === 'success' || noError || result === true) {
              successHandler(true);
              removeTaskId(undefined);
              await sleep(2000);
              await updateData();
              setLightBalance(true);
              setTokenValue(prev => prev + tokensAmount);
              successHandler(false);
            } else {
              errorHandler(true);
              removeTaskId(undefined);
            }
          } else {
            removeTaskId(undefined);
            errorHandler(true);
          }
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [taskId]);

  return null;
};
