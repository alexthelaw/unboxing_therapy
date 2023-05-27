import { ComponentChildren, createContext, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { ServiceContext } from '@utils';

import { RouterContext } from '../../layout';
import { UserStorage } from '../../models';
import {
  AuthenticationResponseObjectType,
  PerkObjectType,
} from '../../services/types';


export const UserContext = createContext<UserStorage>({} as UserStorage);

interface Props {
  children: ComponentChildren;
}
export const UserProvider = ({ children }: Props) => {
  const { setRoute } = useContext(RouterContext);

  const [userData, setUserData] = useState<AuthenticationResponseObjectType>({} as AuthenticationResponseObjectType);
  const [activePerk, setActivePerk] = useState<PerkObjectType & { tag: string } & { isFirstVisit?: boolean }>(
    {} as PerkObjectType & { tag: string } & { isFirstVisit?: boolean },
  );
  const {whoami} = useContext(ServiceContext);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
        setLoading(true);
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        activePerk,
        fetchDataLoading: loading,
        setActivePerk: (s) => undefined,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
