// src/hooks/useUserProfileData.ts
import { useEffect, useState } from 'react';
import { OPENSEA_API_KEY, OpenSeaNTF } from '../leader-board.hooks';
import { Balance, Transaction } from './user-profile.types';

const MORALIS_API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjljZTIwNTliLTg1NTctNDY0My1iNjhjLTZhNDkzMmUzMzFhNSIsIm9yZ0lkIjoiNDMxODQ4IiwidXNlcklkIjoiNDQ0MjEyIiwidHlwZUlkIjoiM2E1MTJiNTgtNzE0ZC00YzdjLWE3NzQtNGQ5ZmRmMzhlOWMwIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3Mzk3NDcwNzIsImV4cCI6NDg5NTUwNzA3Mn0.N4HUaV1ZRpVbWuNliXYtBoejNABkRT6wqSfysICPN8w';

export type ActiveTab = 'balances' | 'transactions' | 'nft';

interface UserProfileData {
  balances?: Balance[];
  transactions?: Transaction[];
  nfts?: OpenSeaNTF[];
}

interface UseUserProfileDataResult {
  data: UserProfileData;
  loading: boolean;
  error: string | null;
}

export const useUserProfileData = (
  walletAddress: string,
  chain: string,
  activeTab: ActiveTab,
): UseUserProfileDataResult => {
  const [data, setData] = useState<UserProfileData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!walletAddress || !chain) return;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (activeTab === 'balances') {
          // Fetch ERC20 balances
          const balanceRes = await fetch(
            `https://deep-index.moralis.io/api/v2.2/${walletAddress}/erc20?chain=${chain.replace('ethereum', 'eth')}&order=DESC&limit=10`,
            {
              headers: {
                accept: 'application/json',
                'X-API-Key': MORALIS_API_KEY,
              },
            },
          );
          const balances: Balance[] = await balanceRes.json();
          console.log("🚀 ~ fetchData ~ balances:", balances)
          // Only returns legit balance
          setData({ balances: balances.filter((balance: Balance) => !balance.possible_spam && !balance.verified_contract) });
        } else if (activeTab === 'transactions') {
          // Fetch ERC20 balances
          const txResponse = await fetch(
            `https://deep-index.moralis.io/api/v2.2/${walletAddress}/erc20/transfers?chain=${chain.replace('ethereum', 'eth')}&order=DESC&limit=10`,
            {
              headers: {
                accept: 'application/json',
                'X-API-Key': MORALIS_API_KEY,
              },
            },
          );
          const data = await txResponse.json();
          console.log("🚀 ~ fetchData ~ transactions:", data)
          // Only returns legit balance
          // setData({ balances: balances.filter((balance: Balance) => !balance.possible_spam && !balance.verified_contract) });
          setData({ transactions: data.result });
        }
        else if (activeTab === 'nft') {
          // Fetch NFT data using OpenSea API
          const nftRes = await fetch(
            `https://api.opensea.io/api/v2/chain/${chain.replace('ethereum', 'eth')}/account/${walletAddress}/nfts?limit=5`,
            {
              headers: {
                accept: 'application/json',
                'X-API-KEY': OPENSEA_API_KEY,
              },
            },
          );
          const nftData = await nftRes.json();
          setData({ nfts: nftData.nfts?.filter((nft: OpenSeaNTF) => nft.display_image_url !== "") });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      }
      setLoading(false);
    };

    fetchData();
  }, [walletAddress, chain, activeTab]);

  return { data, loading, error };
};
