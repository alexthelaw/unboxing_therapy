import { useContext } from 'preact/compat';
import { useEffect } from 'preact/hooks';
import { ServiceContext } from '@utils';

import { TOKEN } from '../../constants';

type AuthListenerProps = {
  onSuccess?: () => void;
};

export const AuthListener = ({ onSuccess }: AuthListenerProps) => {
  const { attachIdentifier, login } = useContext(ServiceContext);
  const tokenHandler = () => {
    const isAuth = !!localStorage.getItem(TOKEN);
    const t = localStorage.getItem('auth_code');
    if (t)
      (async () => {
        if (!isAuth) {
          const data = await login({ sso: { code: t }, client: 'widget' });
          if (data.data?.login.token) {
            localStorage.setItem(TOKEN, data.data.login.token);
            if (onSuccess) await onSuccess();
          } else {
            console.log(data.errors);
          }
        } else {
          const data = await attachIdentifier({ sso: { code: t } });
          if (data.data && onSuccess) await onSuccess();
          if (data.errors) {
            localStorage.removeItem(TOKEN);
          }
        }
        localStorage.removeItem('auth_code');
      })();
  };

  useEffect(() => {
    window.addEventListener('storage', tokenHandler);

    return () => {
      window.removeEventListener('storage', tokenHandler);
    };
  }, []);

  return null;
};
