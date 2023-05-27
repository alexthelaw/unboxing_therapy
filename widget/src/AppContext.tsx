import { ComponentChildren, createContext, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { AppConfigurations, Globals } from './models';

export const ConfigContext = createContext<AppConfigurations>({} as AppConfigurations);
export const GlobalsContext = createContext<Globals>({
  widgetOpen: false,
  setWidgetOpen: () => undefined,
  closeDelay: 0,
  setClosedDelay: () => undefined,
});

interface Props {
  children: ComponentChildren;
  config: AppConfigurations;
  element?: HTMLElement;
}
export const AppContext = ({ children, config, element }: Props) => {
  const [widgetOpen, setWidgetOpen] = useState(false);

  const [closeDelay, setClosedDelay] = useState<number>(0);

  const changeWidgetVisibility = (visible: boolean) => {
    if (visible) {
      setWidgetOpen(true);
    } else {
      setWidgetOpen(false);
    }
  };

  useEffect(() => {
    element?.addEventListener('widget-event', (e: CustomEvent<{ name?: string }>) => {
      // eslint-disable-next-line default-case
      switch (e.detail.name) {
        case 'open':
          changeWidgetVisibility(true);
          break;
        case 'close':
          changeWidgetVisibility(false);
          break;
      }
    });
  }, [element]);

  return (
    <ConfigContext.Provider value={config}>
      <GlobalsContext.Provider
        value={{ widgetOpen, setWidgetOpen: changeWidgetVisibility, closeDelay, setClosedDelay }}
      >
        {children}
      </GlobalsContext.Provider>
    </ConfigContext.Provider>
  );
};
