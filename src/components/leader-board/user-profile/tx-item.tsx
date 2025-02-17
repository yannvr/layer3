// filepath: /Users/yannvallery-radot/dev/iview/layer3/src/components/leader-board/user-profile/tx-item.tsx
import React from 'react';
import styled from 'styled-components';
import { Transaction } from './user-profile.types';

const TransactionContainer = styled.div`
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  background-color: var(--color-background);
  color: var(--color-text);
`;

const TransactionLink = styled.a`
  color: var(--color-link);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const TransactionSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TransactionDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

interface TxExplorerProps {
  chain: string;
  transactionHash: string;
}

const TxExplorer: React.FC<TxExplorerProps> = ({ chain, transactionHash }) => {
  const getExplorerUrl = (chain: string, transactionHash: string) => {
    switch (chain) {
      case 'eth':
        return `https://etherscan.io/tx/${transactionHash}`;
      case 'bsc':
        return `https://bscscan.com/tx/${transactionHash}`;
      case 'polygon':
        return `https://polygonscan.com/tx/${transactionHash}`;
      default:
        return `https://etherscan.io/tx/${transactionHash}`;
    }
  };

  return (
    <TransactionLink href={getExplorerUrl(chain, transactionHash)} target="_blank" rel="noopener noreferrer">
      🔗
    </TransactionLink>
  );
};

const TxItem: React.FC<{ transaction: Transaction; chain: string }> = ({ transaction, chain }) => {
  return (
    <TransactionContainer>
      <TransactionSummary>
        <TransactionDetails>
          <div>
            <strong>From:</strong> {transaction.from_address}
          </div>
          <div>
            <strong>To:</strong> {transaction.to_address || 'Contract Creation'}
          </div>
        </TransactionDetails>
        <TxExplorer chain={chain} transactionHash={transaction.transaction_hash} />
      </TransactionSummary>
    </TransactionContainer>
  );
};

export default TxItem;
