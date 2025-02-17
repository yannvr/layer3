

export interface Balance {
  token_address: string;
  symbol: string;
  name: string;
  logo: string | null;
  thumbnail: string | null;
  decimals: number;
  balance: string;
  possible_spam: boolean;
  verified_contract: boolean;
  total_supply: string;
  total_supply_formatted: string;
  percentage_relative_to_total_supply: number;
  security_score: number | null;
}

export interface Transaction {
  hash: string;
  nonce: string;
  transaction_index: string;
  from_address: string;
  to_address: string | null;
  value: string;
  gas: string;
  gas_price: string;
  receipt_cumulative_gas_used: string;
  receipt_gas_used: string;
  receipt_contract_address: string | null;
  receipt_status: string;
  block_timestamp: string;
  block_number: string;
  block_hash: string;
  transaction_fee: string;
  summary: string;
  possible_spam: boolean;
  category: string;
}
