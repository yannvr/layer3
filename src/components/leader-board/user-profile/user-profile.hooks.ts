// src/hooks/useUserProfileData.ts
import { useState, useEffect } from 'react';
import { Balance, NFT, Transaction } from './user-profile.types';
import { OPENSEA_API_KEY, OpenSeaNTF } from '../leader-board.hooks';

const MORALIS_API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjljZTIwNTliLTg1NTctNDY0My1iNjhjLTZhNDkzMmUzMzFhNSIsIm9yZ0lkIjoiNDMxODQ4IiwidXNlcklkIjoiNDQ0MjEyIiwidHlwZUlkIjoiM2E1MTJiNTgtNzE0ZC00YzdjLWE3NzQtNGQ5ZmRmMzhlOWMwIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3Mzk3NDcwNzIsImV4cCI6NDg5NTUwNzA3Mn0.N4HUaV1ZRpVbWuNliXYtBoejNABkRT6wqSfysICPN8w';

export type ActiveTab = 'activity' | 'transactions' | 'nft';

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

/**
 * Custom hook to fetch user profile data based on the wallet address, selected chain, and active tab.
 * @param walletAddress - the user's wallet address
 * @param chain - the selected chain (supported by Moralis, e.g. 'eth', 'polygon', 'bsc', etc.)
 * @param activeTab - the active view ('activity' or 'nft')
 */
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
        if (activeTab === 'activity') {
          // Fetch ERC20 balances
          const balanceRes = await fetch(
            `https://deep-index.moralis.io/api/v2.2/wallets/${walletAddress}/history?chain=${chain}&order=DESC`,
            {
              headers: {
                accept: 'application/json',
                'X-API-Key': MORALIS_API_KEY,
              },
            },
          );
          const balances: Balance[] = await balanceRes.json();

          // Fetch recent transactions (limit 10, ordered DESC)
          const txRes = await fetch(
            `https://deep-index.moralis.io/api/v2.2/wallets/${walletAddress}/history?chain=${chain}&order=DESC&limit=10`,
            {
              headers: {
                accept: 'application/json',
                'X-API-Key': MORALIS_API_KEY,
              },
            },
          );
          const transactions: Transaction[] = await txRes.json();

          setData({ balances, transactions });
        } else if (activeTab === 'nft') {
          // Fetch NFT data
          // Fetch NFT data using OpenSea API
          const nftRes = await fetch(
            `https://api.opensea.io/api/v2/chain/${chain}/account/${walletAddress}/nfts?limit=5`,
            {
              headers: {
                accept: 'application/json',
                'X-API-KEY': OPENSEA_API_KEY,
              },
            },
          );
          const nftData = await nftRes.json();
          setData({ nfts: nftData.nfts });
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
