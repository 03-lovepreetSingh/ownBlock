export interface ContractDeploymentData {
  name: string;
  symbol: string;
  assetPassportCID: string;
  maxHoldingBps: number;
  propertyId: string;
}

export interface DeployedContract {
  contractAddress: string;
  deploymentTxHash: string;
  propertyId: string;
  name: string;
  symbol: string;
  assetPassportCID: string;
  maxHoldingBps: number;
  deployedAt: Date;
}

export interface TokenMetadata {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: bigint;
  contractAddress: string;
  assetPassportCID: string;
  maxHoldingBps: number;
}

export interface MarketplaceToken {
  id: string;
  propertyId: string;
  contractAddress: string;
  tokenSymbol: string;
  tokenName: string;
  totalSupply: number;
  availableSupply: number;
  tokenPrice: string;
  minInvestment: number;
  fundingProgress: string;
  propertyTitle: string;
  propertyLocation: string;
  propertyValuation: string;
  propertyImages: string[];
  isActive: boolean;
  createdAt: Date;
}