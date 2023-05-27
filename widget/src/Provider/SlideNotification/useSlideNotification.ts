import { useContext } from 'preact/compat';

import { SlideNotificationContext } from './context';

export const useSlideNotification = () => {
  return useContext(SlideNotificationContext);
};
