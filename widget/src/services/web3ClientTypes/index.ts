import { RewardTags } from '@utils';

export interface Web3ClientInterface {
  createAccount: (sender: string) => Promise<string>;
  getAccount: (sender: string) => Promise<string>;
  generateRuffleCallData: (sender: string) => string;
  generateExecuteRuffleFn: (callData: string) => string;
  getBalance: (sender: string) => Promise<string>;
  playUnbox: (sender: string, callData: string) => Promise<any>;
  playUnbox2: (sender: string) => Promise<any>;
  getMetaData: (tokenId: number) => Promise<RewardTags>;
}
