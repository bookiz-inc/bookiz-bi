export interface Affiliation {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  alias: string;
  tax_id: string;
  phone_number: string;
  instagram: string | null;
  facebook: string | null;
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  created_at: string;
  updated_at: string;
  user: number;
}

export interface CreateAffiliationData {
  firstName: string;
  lastName: string;
  userId: string;
  linkName: string;
}
