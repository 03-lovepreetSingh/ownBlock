import { useQuery } from '@tanstack/react-query';

export interface Document {
  id: number;
  name: string;
  type: string;
  verified: boolean;
  hash: string;
  verifier?: string;
  date: string;
}

export interface Attestation {
  name: string;
  issuer: string;
  did: string;
  date: string;
  status: 'valid' | 'expired' | 'revoked';
}

export interface OwnershipRecord {
  address: string;
  tokens: number;
  percentage: number;
  date: string;
  type: 'retail' | 'institutional' | 'developer';
}

// Hook for fetching property documents
export function usePropertyDocuments(propertyId: string) {
  return useQuery({
    queryKey: ['property-documents', propertyId],
    queryFn: async () => {
      // Return mock data for now since there's no documents table in the schema
      const mockDocuments: Document[] = [
        {
          id: 1,
          name: 'Property Deed',
          type: 'Legal Document',
          verified: true,
          hash: '0x1234567890abcdef',
          verifier: 'Legal Authority',
          date: '2024-01-15'
        },
        {
          id: 2,
          name: 'Property Valuation Report',
          type: 'Financial Document',
          verified: true,
          hash: '0xabcdef1234567890',
          verifier: 'Certified Appraiser',
          date: '2024-01-10'
        }
      ];
      return mockDocuments;
    },
    enabled: !!propertyId,
  });
}

// Hook for fetching property attestations
export function usePropertyAttestations(propertyId: string) {
  return useQuery({
    queryKey: ['property-attestations', propertyId],
    queryFn: async () => {
      // Return mock data for now since there's no attestations table in the schema
      const mockAttestations: Attestation[] = [
        {
          name: 'Property Ownership Verification',
          issuer: 'Government Registry',
          did: 'did:example:123456789abcdefghi',
          date: '2024-01-20',
          status: 'valid'
        },
        {
          name: 'Environmental Compliance',
          issuer: 'Environmental Agency',
          did: 'did:example:987654321ihgfedcba',
          date: '2024-01-18',
          status: 'valid'
        }
      ];
      return mockAttestations;
    },
    enabled: !!propertyId,
  });
}

// Hook for fetching property ownership records
export function usePropertyOwnership(propertyId: string) {
  return useQuery({
    queryKey: ['property-ownership', propertyId],
    queryFn: async () => {
      // Fetch actual ownership data from investments table
      try {
        const response = await fetch(`/api/properties/${propertyId}/ownership`);
        if (!response.ok) {
          // Return mock data if API endpoint doesn't exist yet
          const mockOwnership: OwnershipRecord[] = [
            {
              address: '0x1234567890123456789012345678901234567890',
              tokens: 150,
              percentage: 15.0,
              date: '2024-01-15',
              type: 'retail'
            },
            {
              address: '0x0987654321098765432109876543210987654321',
              tokens: 300,
              percentage: 30.0,
              date: '2024-01-10',
              type: 'institutional'
            },
            {
              address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
              tokens: 550,
              percentage: 55.0,
              date: '2024-01-05',
              type: 'developer'
            }
          ];
          return mockOwnership;
        }
        const result = await response.json();
        return result.data;
      } catch (error) {
        // Return mock data on error
        const mockOwnership: OwnershipRecord[] = [
          {
            address: '0x1234567890123456789012345678901234567890',
            tokens: 150,
            percentage: 15.0,
            date: '2024-01-15',
            type: 'retail'
          },
          {
            address: '0x0987654321098765432109876543210987654321',
            tokens: 300,
            percentage: 30.0,
            date: '2024-01-10',
            type: 'institutional'
          }
        ];
        return mockOwnership;
      }
    },
    enabled: !!propertyId,
  });
}