import React, { useState } from 'react';
import BigNumber from 'bignumber.js';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useUserProfileData, ActiveTab } from './user-profile.hooks';
import { Balance, Transaction, NFT } from './user-profile.types';
import { OpenSeaNTF } from '../leader-board.hooks';
import TxItem from './tx-item';

const Container = styled.div`
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
  background-color: var(--color-background);
  color: var(--color-text);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

const TabsHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const TabButton = styled.button<{ active: boolean }>`
  background: ${({ active }) => (active ? '#ffd966' : 'transparent')};
  color: ${({ active }) => (active ? '#000' : 'var(--color-text)')};
  border: none;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  cursor: pointer;
  border-radius: 0.25rem;
`;

const ChainSelect = styled.select`
  margin-left: auto;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  background-color: var(--color-background);
  color: var(--color-text);
`;

const Section = styled.div`
  margin-top: 1rem;
`;

const BalanceItem = styled.div`
  margin-bottom: 0.5rem;
`;

const TransactionItem = styled.div`
  margin-bottom: 0.5rem;
`;

const NFTTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const NFTTh = styled.th`
  border: 1px solid var(--color-border);
  padding: 0.5rem;
`;

const NFTTd = styled.td`
  border: 1px solid var(--color-border);
  padding: 0.5rem;
`;

// List of chains supported by Moralis (extend as needed)
const supportedChains = [
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'bsc', label: 'BSC' },
  { value: 'polygon', label: 'Polygon' },
];

const formatTokenValue = (rawValue: string, decimals: number) => {
  const value = new BigNumber(rawValue);
  // Divide the raw value by 10^(decimals) to shift the decimal point
  return value.dividedBy(new BigNumber(10).pow(decimals)).toFixed();
};

const UserProfile: React.FC = () => {
  // Extract walletAddress from URL parameters
  const { walletAddress } = useParams<{ walletAddress: string }>();

  // Manage active tab and selected chain
  const [activeTab, setActiveTab] = useState<ActiveTab>('balances');
  const [selectedChain, setSelectedChain] = useState<string>('ethereum');

  // Use custom hook to fetch profile data
  const { data, loading, error } = useUserProfileData(walletAddress!, selectedChain, activeTab);
  console.log('🚀 ~ data:', data);

  return (
    <Container>
      <Title>User Profile</Title>
      <TabsHeader>
        <TabButton active={activeTab === 'balances'} onClick={() => setActiveTab('balances')}>
          Balances
        </TabButton>
        <TabButton active={activeTab === 'transactions'} onClick={() => setActiveTab('transactions')}>
          Transactions
        </TabButton>
        <TabButton active={activeTab === 'nft'} onClick={() => setActiveTab('nft')}>
          NFT
        </TabButton>
        <ChainSelect value={selectedChain} onChange={(e) => setSelectedChain(e.target.value)}>
          {supportedChains.map((chain) => (
            <option key={chain.value} value={chain.value}>
              {chain.label}
            </option>
          ))}
        </ChainSelect>
      </TabsHeader>
      <Section>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : activeTab === 'balances' ? (
          <>
            <h2>Balances</h2>
            {data.balances && data.balances.length > 0 ? (
              data.balances.map((token, index) => (
                <BalanceItem key={index}>
                  {/* <strong>{selectedChain}:</strong> */}
                  <ul>
                    <li key={index}>
                      {token.symbol}: {formatTokenValue(token.balance, token.decimals)}
                    </li>
                  </ul>
                </BalanceItem>
              ))
            ) : (
              <p>No balances available.</p>
            )}
          </>
        ) : activeTab === 'transactions' ? (
          <>
            <h2>Recent Transactions</h2>
            {data.transactions && data.transactions.length > 0 ? (
              data.transactions.map((tx: Transaction) => (
                <TxItem key={tx.transaction_hash} transaction={tx} chain={selectedChain} />
              ))
            ) : (
              <p>No transactions available.</p>
            )}
          </>
        ) : (
          <>
            <h2>NFTs</h2>
            {data.nfts && data.nfts.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {data.nfts.map((nft: OpenSeaNTF) => (
                  <div
                    key={nft.identifier}
                    style={{
                      border: '1px solid var(--color-border)',
                      padding: '1rem',
                      borderRadius: '0.25rem',
                      width: '150px',
                      textAlign: 'center',
                    }}
                  >
                    <div>{nft.name || 'Unnamed'}</div>
                    <img
                      src={nft.display_image_url}
                      alt={nft.name}
                      width="100"
                      height="100"
                      style={{ objectFit: 'cover', marginTop: '0.5rem' }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>No NFTs available.</p>
            )}
          </>
        )}
      </Section>
    </Container>
  );
};

export default UserProfile;
