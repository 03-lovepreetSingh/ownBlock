import { useQuery } from '@tanstack/react-query';

export interface MarketData {
  tokenPrice: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
  totalSupply: number;
  holders: number;
  fundingProgress: number;
  orderBook: {
    price: number;
    amount: number;
    total: number;
    type: 'buy' | 'sell';
  }[];
}

// Hook for fetching token market data
export function useTokenMarketData(propertyId: string) {
  return useQuery({
    queryKey: ['token-market-data', propertyId],
    queryFn: async () => {
      // TODO: Implement actual API call when endpoint is available
      // For now, return mock data based on property
      return {
        tokenPrice: 500,
        priceChange24h: 2.4,
        marketCap: 8500000,
        volume24h: 125000,
        totalSupply: 25000,
        holders: 83,
        fundingProgress: 68,
        orderBook: [
          { price: 502.0, amount: 23, total: 31626.0, type: 'sell' },
          { price: 504.0, amount: 33, total: 40320.0, type: 'sell' },
          { price: 506.0, amount: 72, total: 17204.0, type: 'sell' },
          { price: 508.0, amount: 14, total: 11176.0, type: 'sell' },
          { price: 510.0, amount: 54, total: 6120.0, type: 'sell' },
          { price: 512.0, amount: 57, total: 4608.0, type: 'sell' },
          { price: 514.0, amount: 7, total: 47288.0, type: 'sell' },
          { price: 516.0, amount: 34, total: 52116.0, type: 'sell' },
        ]
      } as MarketData;
    },
    enabled: !!propertyId,
  });
}