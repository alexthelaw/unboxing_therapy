import { ComponentChildren, createContext, h } from 'preact';
import { useRef } from 'preact/hooks';

import { BACKEND_API_URL } from '../constants';
import { WidgetApi } from '../models';
import { ApiClient } from '../services/apiClient';

export const ServiceContext = createContext<WidgetApi>({} as WidgetApi);

interface Props {
  children: ComponentChildren;
}

export const ApolloContext = ({ children }: Props) => {
  const services = useRef(
    new ApiClient({
      baseUrl: BACKEND_API_URL || '',
    }),
  );

  return <ServiceContext.Provider value={services.current}>{children}</ServiceContext.Provider>;
};
