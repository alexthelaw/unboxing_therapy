import { ComponentChildren, createContext, h } from 'preact';
import { useContext, useRef } from 'preact/hooks';

import { Web3Client } from '../services/web3Client';
import { Web3ClientInterface } from '../services/web3ClientTypes';

export const Web3Context = createContext<Web3ClientInterface>({} as Web3ClientInterface);

interface Props {
  children: ComponentChildren;
}

export const Web3ContextProvider = ({ children }: Props) => {
  const services = useRef(new Web3Client());

  return <Web3Context.Provider value={services.current}>{children}</Web3Context.Provider>;
};

export const useWeb3 = () => useContext(Web3Context);
