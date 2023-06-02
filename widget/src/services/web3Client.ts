import { ethers } from 'ethers';

import { RewardTags } from '../utils/someTo';

import { AccountFactoryAbi } from './web3ClientTypes/accountFactory';
import { entryPoint2, entryPointAbi } from './web3ClientTypes/entryPoint';
import { Web3ClientInterface } from './web3ClientTypes';

export class Web3Client implements Web3ClientInterface {
  private readonly salt: string;
  private readonly wallet: ethers.Wallet;
  private accountFactory: ethers.Contract;
  private entryPoint: ethers.Contract;
  private readonly lotteryAddress: string;
  constructor() {
    const _salt = process.env.SALT;
    const _lotteryAddress = process.env.LOTTERY_ADDRESS;
    const accountFactoryAddress = process.env.ACCOUNT_FACTORY_ADDRESS;
    const entryPointAddress = process.env.ENTRY_POINT_ADDRESS;
    if (!_salt || !accountFactoryAddress || !entryPointAddress || !_lotteryAddress) {
      throw new Error('Fix .env please');
    }
    this.lotteryAddress = _lotteryAddress;
    this.salt = _salt;
    const provider = new ethers.providers.JsonRpcProvider('https://rpc.testnet.mantle.xyz');
    const _wallet = new ethers.Wallet('88d14cbeeb723bd59b2cfccb4a6c1c7de168ebc10bd8d006166ff82d2ce9df53', provider);
    this.wallet = _wallet;
    this.accountFactory = new ethers.Contract(accountFactoryAddress, AccountFactoryAbi, _wallet);
    this.entryPoint = new ethers.Contract(entryPointAddress, entryPointAbi, _wallet);
  }

  public createAccount = async (sender: string): Promise<string> => {
    const tx = await this.accountFactory.createAccount(sender, this.salt);
    if (tx) {
      return await this.accountFactory.getAddress(sender, this.salt);
    }
    return '';
  };

  public getAccount = async (sender: string): Promise<string> => {
    return await this.accountFactory.getAddress(sender, this.salt);
  };

  public generateRuffleCallData = (sender: string): string => {
    const _sender = sender.slice(2, sender.length);
    return `0x3c5264f7000000000000000000000000${_sender}`;
  };
  public generateExecuteRuffleFn = (callData: string): string => {
    const _callData = callData.slice(2, callData.length);
    const _lottery = this.lotteryAddress.slice(2, this.lotteryAddress.length);
    return `0xb61d27f6000000000000000000000000${_lottery}000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000024${_callData}00000000000000000000000000000000000000000000000000000000`;
  };

  public getBalance = async (sender: string): Promise<string> => {
    const balanceData = await this.entryPoint.balanceOf(sender);
    if (balanceData._hex) {
      return ethers.utils.formatEther(balanceData._hex);
    }
    console.log(balanceData);
    return balanceData;
  };

  public playUnbox = async (sender: string, callData: string): Promise<any> => {
    // const nonce = await this.wallet.getTransactionCount();
    const txData = await this.entryPoint.playUnboxRuffle(
      this.lotteryAddress,
      sender,
      callData,
      '20000000000000000000',
      // {
      //   nonce: nonce + 1,
      // },
    );
    const a = await txData.wait();
    console.log(a);
    console.log(txData);
    return a;
  };

  public playUnbox2 = async (sender: string): Promise<any> => {
    const nonce = await this.wallet.getTransactionCount();
    const ep = new ethers.Contract(this.lotteryAddress, entryPoint2, this.wallet);
    console.log({ nonce });
    const txData = await ep.sendRandomToken(sender, {
      gasLimit: 1_000_000,
      // nonce: nonce + 1,
    });
    const a = await txData.wait();
    console.log(a);
    console.log(txData);
    return a;
  };

  public getMetaData = async (tokenId: number): Promise<RewardTags> => {
    const collection = new ethers.Contract(this.lotteryAddress, entryPoint2, this.wallet);
    const txData = await collection.tokenURI(tokenId);
    return txData as RewardTags;
  };
}
