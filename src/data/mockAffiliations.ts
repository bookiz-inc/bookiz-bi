import { Affiliation } from '@/types/affiliation';

export const mockAffiliations: Affiliation[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    userId: 'user123',
    linkName: 'johndoe-ref',
    createdAt: '2023-01-15T10:00:00Z',
    totalReferrals: 25,
    status: 'active',
    revenue: 2500,
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    userId: 'user456',
    linkName: 'janesmith-ref',
    createdAt: '2023-02-20T15:30:00Z',
    totalReferrals: 15,
    status: 'active',
    revenue: 1500,
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Johnson',
    userId: 'user789',
    linkName: 'mikej-ref',
    createdAt: '2023-03-10T09:15:00Z',
    totalReferrals: 5,
    status: 'inactive',
    revenue: 500,
  },
];