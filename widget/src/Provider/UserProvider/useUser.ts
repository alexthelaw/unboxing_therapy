import { useContext } from 'preact/compat';

import { UserContext } from './index';

export const useUser = () => {
  return useContext(UserContext);
};
