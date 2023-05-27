import { ComponentType, createContext, createElement, h, VNode } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { ApolloContext } from '@utils';

import BottomNav from '../components/BottomNav';
import TitleBar from '../components/TitleBar';
import { UserProvider } from '../Provider';
import { SlideNotificationProvider } from '../Provider/SlideNotification/context';

const DEFAULT_ROUTE = '/openBoxes';

interface Props {
  /**
   * Specifies all URLs and their respectful components.
   */
  routes: {
    [DEFAULT_ROUTE]: VNode;
    [key: string]: VNode;
  };
  onChange?: (route: string) => void;
}

/**
 * Stores current URL of the router and allows to change it programmatically.
 */
export const RouterContext = createContext<{
  route: string;
  setRoute: (route: string) => void;
  back: () => void;
  withText: boolean;
  setWithText: (_s: boolean) => void;
}>({
  route: DEFAULT_ROUTE,
  back: () => undefined,
  setRoute: () => undefined,
  withText: false,
  setWithText: () => undefined,
});

/**
 * Oversimplified router component.
 */
export const Router = ({ routes, onChange }: Props) => {
  const [route, setRoute] = useState(DEFAULT_ROUTE);
  const [previousRoute, setPreviousRoute] = useState('');
  const [withText, setWithText] = useState<boolean>(false);
  useMemo(() => {
    onChange?.(route);
  }, [route]);

  const setNextRoute = (r: string) => {
    setRoute(prevState => {
      setPreviousRoute(prevState);
      return r;
    });
  };

  const goBack = () => {
    setRoute(previousRoute);
  };

  return (
    <RouterContext.Provider
      value={{
        route,
        setRoute: setNextRoute,
        back: goBack,
        withText,
        setWithText,
      }}
    >
      <TitleBar />
      <ApolloContext>
        <UserProvider>
          <SlideNotificationProvider>{routes[route]}</SlideNotificationProvider>
        </UserProvider>
      </ApolloContext>
      {route !== '/' ? <BottomNav /> : <div style={{ height: '80px' }} />}
    </RouterContext.Provider>
  );
};

export const RouteComponent = (props: { component: ComponentType<null> }) => createElement(props.component, null);

/**
 * Render anchor with click handler to switch route based on `href` attribute.
 * We intentionally override final `href`, so links within widget won't lead to actual
 * pages on website.
 */
export const RouteLink = ({ href, children, onClick, ...rest }: h.JSX.HTMLAttributes<HTMLAnchorElement>) => (
  <RouterContext.Consumer>
    {({ route, setRoute }) => (
      <a
        // eslint-disable-next-line no-script-url
        href="javascript:;"
        onClick={e => {
          if (onClick) onClick(e);
          setRoute(String(href));
        }}
        {...rest}
      >
        {children}
      </a>
    )}
  </RouterContext.Consumer>
);
