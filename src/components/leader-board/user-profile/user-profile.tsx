import React, { useState } from 'react';
import BigNumber from 'bignumber.js';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useUserProfileData, ActiveTab } from './user-profile.hooks';
import { Balance, Transaction } from './user-profile.types';
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

const supportedChains = [
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'bsc', label: 'BSC' },
  { value: 'polygon', label: 'Polygon' },
];

const formatTokenValue = (rawValue: string, decimals: number) => {
  const value = new BigNumber(rawValue);
  return value.dividedBy(new BigNumber(10).pow(decimals)).toFixed();
};

const UserProfile: React.FC = () => {
  const { walletAddress } = useParams<{ walletAddress: string }>();
  const [activeTab, setActiveTab] = useState<ActiveTab>('balances');
  const [selectedChain, setSelectedChain] = useState<string>('ethereum');
  const { data, loading, error } = useUserProfileData(walletAddress!, selectedChain, activeTab);

  const renderTabContent = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    switch (activeTab) {
      case 'balances':
        return (
          <>
            <h2>Balances</h2>
            {data.balances && data.balances.length > 0 ? (
              data.balances.map((token, index) => (
                <BalanceItem key={index}>
                  <ul>
                    <li>
                      {token.symbol}: {formatTokenValue(token.balance, token.decimals)}
                    </li>
                  </ul>
                </BalanceItem>
              ))
            ) : (
              <p>No balances available.</p>
            )}
          </>
        );
      case 'transactions':
        return (
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
        );
      case 'nft':
        return (
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
        );
      default:
        return null;
    }
  };

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
      <Section>{renderTabContent()}</Section>
    </Container>
  );
};

export default UserProfile;
