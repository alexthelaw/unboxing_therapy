import { ComponentChildren, createContext, h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';

import { RUFFLE_TOKENS, SMART_ACCOUNT_ADDRESS } from '../../constants';
import { RouterContext } from '../../layout';
import { Token, TUserRuffle, UserStorage } from '../../models';

export const UserContext = createContext<UserStorage>({} as UserStorage);

interface Props {
  children: ComponentChildren;
}

export const UserProvider = ({ children }: Props) => {
  const { setRoute } = useContext(RouterContext);
  const userRuffles = () => JSON.parse(localStorage.getItem(RUFFLE_TOKENS) || '[]') as TUserRuffle[];

  const addTokenToRuffle = (_token: Token, ruffleId: number) => {
    const _userRuffles = userRuffles();
    const ruffle = _userRuffles.find(_ruffle => _ruffle.id === ruffleId);
    if (ruffle) {
      ruffle.tokens.push(_token);
    } else {
      _userRuffles.push({ id: _userRuffles.at(-1)?.id || 0, tokens: [_token] });
    }
    localStorage.setItem(RUFFLE_TOKENS, JSON.stringify(_userRuffles));
  };

  const setIsClaimed = (tokenId: number, ruffleId: number) => {
    console.log(tokenId, ruffleId);
    const _userRuffles = userRuffles();
    const ruffle = _userRuffles.find(_ruffle => _ruffle.id === ruffleId);
    if (ruffle) {
      const token = ruffle.tokens.find(_token => _token.tokenId === tokenId);
      if (token) {
        console.log(token);
        const index = ruffle.tokens.indexOf(token);
        ruffle.tokens.splice(index, 1, { ...token, isOpened: true });
        localStorage.setItem(RUFFLE_TOKENS, JSON.stringify(_userRuffles));
      }
    }
  };

  const getUserRuffles = () => {
    return () => userRuffles();
  };

  useEffect(() => {
    const token = localStorage.getItem(SMART_ACCOUNT_ADDRESS);
    if (token) {
      setRoute('/offers');
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userRuffles: getUserRuffles()(),
        addTokenToRuffle,
        setIsClaimed,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
