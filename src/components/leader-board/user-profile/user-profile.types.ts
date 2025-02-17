

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
  address: string;
  block_hash: string;
  block_number: string;
  block_timestamp: string;
  from_address: string;
  from_address_entity: string | null;
  from_address_entity_logo: string | null;
  from_address_label: string | null;
  log_index: number;
  possible_spam: boolean;
  security_score: number | null;
  to_address: string;
  to_address_entity: string | null;
  to_address_entity_logo: string | null;
  to_address_label: string | null;
  token_decimals: string;
  token_logo: string;
  token_name: string;
  token_symbol: string;
  transaction_hash: string;
  transaction_index: number;
  value: string;
  value_decimal: string;
  verified_contract: boolean;
}
