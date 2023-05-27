import { h } from 'preact';
import { lazy, Suspense } from 'preact/compat';
import clsx from 'clsx';

import './../fonts/fonts.css';

import Loader from '../components/UI/Loader';

import style from './main.css';
import { RouteComponent, Router } from './Router';
import routesStyles from './routes.css';

const Prizes = lazy(async () => await import('../routes/Prizes'));
const Profile = lazy(async () => await import('../routes/Profile'));
const Offers = lazy(async () => await import('../routes/Offers'));
const AuthScreen = lazy(async () => await import('../routes/Auth'));
const OpenBoxes = lazy(async () => await import('../routes/OpenBoxes'));

const SCREEN_HEIGHT_MULTIPLIER = 0.85;

const Routes = () => {
  const height = window.innerHeight * SCREEN_HEIGHT_MULTIPLIER;
  const paddingTop = clsx(routesStyles.padding_wrapper);

  return (
    <div className={style.container} style={{ height: `${height}px` }} id={'rootContainer'}>
      <Router
        routes={{
          '/': (
            <Suspense fallback={<Loader />}>
              <div className={routesStyles.appear_wrapper} key={'auth'}>
                <AuthScreen />
              </div>
            </Suspense>
          ),
          '/offers': (
            <Suspense fallback={<Loader />}>
              <div className={routesStyles.appear_wrapper} key={'offers'}>
                <div className={paddingTop}>
                  <RouteComponent component={Offers} />
                </div>
              </div>
            </Suspense>
          ),
          '/prizes': (
            <Suspense fallback={<Loader />}>
              <div className={routesStyles.appear_wrapper} key={'prizes'}>
                <div className={paddingTop}>
                  <RouteComponent component={Prizes} />
                </div>
              </div>
            </Suspense>
          ),
          '/profile': (
            <Suspense fallback={<Loader />}>
              <div className={routesStyles.appear_wrapper} key={'profile'}>
                <div className={paddingTop}>
                  <RouteComponent component={Profile} />
                </div>
              </div>
            </Suspense>
          ),
          '/openBoxes': (
            <Suspense fallback={<Loader />}>
              <div className={routesStyles.appear_wrapper} key={'openBoxes'}>
                <div className={paddingTop}>
                  <RouteComponent component={OpenBoxes} />
                </div>
              </div>
            </Suspense>
          ),
        }}
      />
    </div>
  );
};

export default Routes;
