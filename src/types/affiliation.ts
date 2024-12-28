export interface LinkData {
  link: string;
  clicks: number;
}

export interface Affiliation {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  alias: string;
  instagram?: string;
  facebook?: string;
  tier: string;
  created_at: string;
  link_data: LinkData;
}

export interface CreateAffiliationData {
  firstName: string;
  lastName: string;
  userId: string;
  linkName: string;
}
