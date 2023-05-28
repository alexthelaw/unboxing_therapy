import OInchImage from '../../assets/icons/0inch.png';
import OInchImageBig from '../../assets/icons/0inch_big.png';
import OInchRewarded from '../../assets/icons/0inch_rewarded.png';
import TetherImage from '../../assets/icons/tether.png';
import TetherImageBig from '../../assets/icons/tether_big.png';
import TetherRewarded from '../../assets/icons/tether_rewarded.png';
import UtNftImage from '../../assets/icons/ut_nft.png';
import UtNftImageBig from '../../assets/icons/ut_nft_big.png';
import UtNftRewarded from '../../assets/icons/ut_nft_rewarded.png';

export const routeToTitle: Record<string, string> = {
  '/offers': 'Unboxing Therapy',
  '/prizes': 'Prizes',
  '/profile': 'Profile',
};

export type RewardTags = '0inch' | 'tether' | 'utnft';

export const tagToImage: Record<RewardTags, any> = {
  utnft: UtNftImage,
  tether: TetherImage,
  '0inch': OInchImage,
};
export const tagToBigImage: Record<RewardTags, any> = {
  utnft: UtNftImageBig,
  tether: TetherImageBig,
  '0inch': OInchImageBig,
};

export const tagToName: Record<RewardTags, string> = {
  utnft: 'UT NFT',
  tether: '10 USDT',
  '0inch': '0inch Premium',
};

export const tagToSubName: Record<RewardTags, string> = {
  utnft: 'convert into game items',
  tether: 'will be sent to your address',
  '0inch': '3 month of zero exchange rates at 0inch',
};

export const tagToRewardedImage: Record<RewardTags, any> = {
  utnft: UtNftRewarded,
  tether: TetherRewarded,
  '0inch': OInchRewarded,
};
