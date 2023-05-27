import axios, { AxiosError, AxiosInstance } from 'axios';

import { TOKEN } from '../constants';
import { WidgetApi } from '../models';

import { ApiResponse } from './types';

interface ApiClientOptions {
  baseUrl: string;
  /**
   * An optional factory, that should supply bearer token which will
   * be attached to authorization header when making requests.
   */
  authTokenFactory?: () => Promise<string | undefined>;
  /**
   * Write more logs into console.
   */
  debug?: boolean;
}

interface ApiRequest<TRequest = unknown> {
  readonly method?: 'GET' | 'DELETE' | 'POST' | 'PUT';
  readonly requestData?: TRequest;
}

export class ApiClient implements WidgetApi {
  private readonly client: AxiosInstance;

  constructor(options: ApiClientOptions) {
    if (!options?.baseUrl) {
      throw new Error('baseUrl is required');
    }

    this.client = axios.create({
      baseURL: options.baseUrl,
    });

    this.client.interceptors.response.use(undefined, (error: AxiosError) => {
      console.log('Failed to call API', error.response?.status, error.response?.data);
      return Promise.reject(error);
    });
    if (options.debug) {
      this.useDebugLogs();
    }

    if (options.authTokenFactory) {
      this.useAuth(options.authTokenFactory, options.debug);
    }
  }

  public whoami = async (): Promise<ApiResponse<WhoamiResponse>> => {
    await this.useAuth(async () => localStorage.getItem(TOKEN) || '');
    const request: ApiRequest = {
      requestData: whoamiQuery(),
      method: 'POST',
    };
    return await this.callApi<ApiResponse<WhoamiResponse>>(request);
  };

  public login = async (variables: LoginVariables): Promise<ApiResponse<LoginResponse>> => {
    await this.useTimezone();
    const request: ApiRequest = {
      requestData: loginMutation(variables),
      method: 'POST',
    };
    return await this.callApi<ApiResponse<LoginResponse>>(request);
  };

  public logout = async (): Promise<ApiResponse<boolean>> => {
    await this.useAuth(async () => localStorage.getItem(TOKEN) || '');
    const request: ApiRequest = {
      requestData: logoutMutation(),
      method: 'POST',
    };
    return await this.callApi<ApiResponse<boolean>>(request);
  };

  public attachIdentifier = async (
    variables: AttachIdentifierVariables,
  ): Promise<ApiResponse<AuthenticationResponseObjectType>> => {
    await this.useAuth(async () => localStorage.getItem(TOKEN) || '');
    const request: ApiRequest = {
      requestData: attachIdentifierMutation(variables),
      method: 'POST',
    };
    return await this.callApi<ApiResponse<AuthenticationResponseObjectType>>(request);
  };

  public addEvent = async (variables: AddEventsVariables): Promise<ApiResponse<EventObjectType>> => {
    await this.useAuth(async () => localStorage.getItem(TOKEN) || '');
    const request: ApiRequest = {
      requestData: addEventMutation(variables),
      method: 'POST',
    };
    return await this.callApi<ApiResponse<EventObjectType>>(request);
  };

  public getClientQuestsConfiguration = async (): Promise<ApiResponse<QuestsConfiguration>> => {
    const request: ApiRequest = {
      requestData: getClientQuestsConfigurationQuery({ client: 'widget' }),
      method: 'POST',
    };
    return await this.callApi<ApiResponse<QuestsConfiguration>>(request);
  };

  public getClientSkillsConfiguration = async (): Promise<ApiResponse<GetClientsSkillsConfiguration>> => {
    const request: ApiRequest = {
      requestData: getClientSkillsConfigurationQuery({ client: 'widget' }),
      method: 'POST',
    };
    return await this.callApi<ApiResponse<GetClientsSkillsConfiguration>>(request);
  };

  public getNextArticleTag = async (variables: {
    articleCategoryTag: string;
  }): Promise<ApiResponse<GetNextArticleTag>> => {
    await this.useAuth(async () => localStorage.getItem(TOKEN) || '');
    const request: ApiRequest = {
      requestData: getArticleTagQuery(variables),
      method: 'POST',
    };
    return await this.callApi<ApiResponse<GetNextArticleTag>>(request);
  };

  public startQuest = async (variables: StartQuestVariables): Promise<ApiResponse<StartQuestResponse>> => {
    await this.useAuth(async () => localStorage.getItem(TOKEN) || '');
    const request: ApiRequest = {
      requestData: startQuestMutation(variables),
      method: 'POST',
    };
    return await this.callApi<ApiResponse<StartQuestResponse>>(request);
  };

  public getUserQuestActivity = async (
    variables?: GetUserQuestActivityVariables,
  ): Promise<ApiResponse<GetUserQuestActivityResponse>> => {
    await this.useAuth(async () => localStorage.getItem(TOKEN) || '');
    const request: ApiRequest = {
      requestData: getUserQuestActivity(variables),
      method: 'POST',
    };
    return await this.callApi<ApiResponse<GetUserQuestActivityResponse>>(request);
  };

  public checkAndCompleteQuest = async (
    variables: CheckAndCompleteQuestVariables,
  ): Promise<ApiResponse<CheckAndCompleteQuestResponse>> => {
    await this.useAuth(async () => localStorage.getItem(TOKEN) || '');
    const request: ApiRequest = {
      requestData: checkAndCompleteQuest(variables),
      method: 'POST',
    };
    return await this.callApi<ApiResponse<CheckAndCompleteQuestResponse>>(request);
  };

  public getTask = async (variables: { taskId: number }): Promise<ApiResponse<GetTaskResponse>> => {
    await this.useAuth(async () => localStorage.getItem(TOKEN) || '');
    const request: ApiRequest = {
      requestData: getTask(variables),
      method: 'POST',
    };
    return await this.callApi<ApiResponse<GetTaskResponse>>(request);
  };

  public getAchievements = async (): Promise<ApiResponse<FindAchievementResponseObjectType>> => {
    await this.useAuth(async () => localStorage.getItem(TOKEN) || '');
    const did = '';
    const request: ApiRequest = {
      requestData: getAccountAchievements({ params: { did } }),
      method: 'POST',
    };
    return await this.callApi<ApiResponse<FindAchievementResponseObjectType>>(request);
  };

  public mintSbtToken = async (variables: MintSbtTokenVariables): Promise<ApiResponse<MintSbtObjectType>> => {
    await this.useAuth(async () => localStorage.getItem(TOKEN) || '');
    const request: ApiRequest = {
      requestData: mintSbtToken(variables),
      method: 'POST',
    };
    return await this.callApi<ApiResponse<MintSbtObjectType>>(request);
  };

  public getPerksConfiguration = async (): Promise<ApiResponse<GetPerksResponseType>> => {
    await this.useAuth(async () => localStorage.getItem(TOKEN) || '');
    const request: ApiRequest = {
      requestData: getPerksConfiguration(),
      method: 'POST',
    };
    return await this.callApi<ApiResponse<GetPerksResponseType>>(request);
  };

  public redeemPerk = async (variables: RedeemPerkVariables): Promise<ApiResponse<RedeemPerkResponse>> => {
    await this.useAuth(async () => localStorage.getItem(TOKEN) || '');
    const request: ApiRequest = {
      requestData: redeemPerk(variables),
      method: 'POST',
    };
    return await this.callApi<ApiResponse<RedeemPerkResponse>>(request);
  };

  /**
   * Helper with saint defaults to perform an HTTP call.
   * @param request A request to perform.
   */
  private callApi<TResponse = unknown, TRequest = unknown>(request: ApiRequest<TRequest>): Promise<TResponse> {
    return new Promise((resolve, reject) => {
      this.client
        .request<TResponse>({
          method: request.method ?? 'GET',
          data: request.requestData,
          responseType: 'json',
        })
        .then(response =>
          response?.status && response.status >= 200 && response.status < 400
            ? resolve(response?.data)
            : reject(response?.data),
        )
        .catch((error: AxiosError) => reject(error.response ?? error.message));
    });
  }

  private useDebugLogs() {
    this.client.interceptors.request.use(config => {
      console.info('Calling API', config.url, config.params);
      return config;
    });

    this.client.interceptors.response.use(
      response => {
        console.info('Got response from API', response.config.url, response.data);
        return response;
      },
      (error: AxiosError) => {
        console.info('There was an error calling API', error.request?.url, error.response?.status, error.message);
        return Promise.reject(error);
      },
    );
  }

  private useAuth(tokenFactory: () => Promise<string | undefined>, debug?: boolean) {
    this.client.interceptors.request.use(async config => {
      const token = await tokenFactory();
      if (token) {
        config.headers.Authorization = `bearer ${token}`;
      } else if (debug) {
        console.log('No token returned by factory, skipping Authorization header');
      }

      return config;
    });
  }

  private useTimezone() {
    this.client.interceptors.request.use(async config => {
      // eslint-disable-next-line new-cap
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      config.headers['X-systemzone'] = timeZone;

      return config;
    });
  }
}
