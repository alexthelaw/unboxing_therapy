import { AxiosError } from 'axios';

export type FunctionResult<T = unknown> = {
  query: string;
  variables?: T;
};

export type ApiResponse<T> = {
  data?: T;
  errors?: AxiosError;
};
