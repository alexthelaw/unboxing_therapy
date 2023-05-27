import { h } from 'preact';

import Main from './layout/Main';
import { AppContext } from './AppContext';
import { Configurations } from './models';

type Props = Configurations;
const App = ({ element, ...appSettings }: Props) => (
  <AppContext config={appSettings} element={element}>
    <Main />
  </AppContext>
);

export default App;
