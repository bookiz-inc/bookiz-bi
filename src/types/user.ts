export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: 'active' | 'inactive';
    role: 'user' | 'admin';
    lastLogin: string;
  }