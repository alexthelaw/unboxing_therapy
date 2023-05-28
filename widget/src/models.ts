import { RewardTags } from './utils/someTo';

interface InfraConfigurations {
  element?: HTMLElement;
}

/**
 * A model representing all possible configurations
 * that can be done from embedded script. Those settings
 * are passed around in application via Context.
 */
export interface AppConfigurations {
  debug: boolean;
  serviceBaseUrl: string;
  minimized: boolean;
  disableDarkMode: boolean;
  text: {
    minimizedTitle?: string;
    formTitle?: string;
  };
  styles: {
    classNameContainer?: string;
  };
}

export type Configurations = InfraConfigurations & AppConfigurations;

export interface Globals {
  widgetOpen: boolean;
  setWidgetOpen: (open: boolean) => void;
  closeDelay: number;
  setClosedDelay: (delay: number) => void;
}

export type Token = {
  tag: RewardTags;
  tokenId: number;
  isClaimed: boolean;
  isOpened: boolean;
};

export type TUserRuffle = {
  tokens: Array<Token>;
  id: number;
};

export interface UserStorage {
  userRuffles: TUserRuffle[];
  addTokenToRuffle: (_token: Token, ruffleId: number) => void;
  setIsClaimed: (tokenId: number, ruffleId: number) => void;
}
