export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  tag: 'work' | 'personal' | 'family' | 'other';
  notes: string;
  createdAt: Date;
}
