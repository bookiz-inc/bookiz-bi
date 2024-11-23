export interface Affiliation {
    id: string;
    firstName: string;
    lastName: string;
    userId: string;
    linkName: string;
    createdAt: string;
    totalReferrals: number;
    status: 'active' | 'inactive';
    revenue: number;
  }
  
  export interface CreateAffiliationData {
    firstName: string;
    lastName: string;
    userId: string;
    linkName: string;
  }