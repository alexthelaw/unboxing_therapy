import { ApiResponse } from './services/types';

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

export interface WidgetApi {
  whoami: () => Promise<ApiResponse<WhoamiResponse>>;
}

export interface Globals {
  widgetOpen: boolean;
  setWidgetOpen: (open: boolean) => void;
  closeDelay: number;
  setClosedDelay: (delay: number) => void;
}

export interface UserStorage {
  userData: AuthenticationResponseObjectType;
  activePerk: PerkObjectType & { tag: string };
  setActivePerk: (s: string) => void;
  fetchDataLoading: boolean;
}
