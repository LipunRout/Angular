import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';

const STORAGE_KEY = 'ng_contacts';

const SEED: Contact[] = [
  { id: '1', firstName: 'Priya', lastName: 'Sharma', email: 'priya@example.com', phone: '+91 98765 43210', company: 'Infosys', tag: 'work', notes: 'Project lead on the dashboard rewrite.', createdAt: new Date('2024-01-10') },
  { id: '2', firstName: 'Rohan', lastName: 'Mehta', email: 'rohan.mehta@gmail.com', phone: '+91 99001 12345', company: '', tag: 'personal', notes: 'Met at Angular India meetup.', createdAt: new Date('2024-02-14') },
  { id: '3', firstName: 'Aisha', lastName: 'Khan', email: 'aisha.k@techcorp.in', phone: '+91 87654 32100', company: 'TechCorp', tag: 'work', notes: 'UX designer, great taste.', createdAt: new Date('2024-03-05') },
  { id: '4', firstName: 'Dev', lastName: 'Patel', email: 'dev@family.net', phone: '+91 90000 11111', company: '', tag: 'family', notes: 'Brother. Call on weekends.', createdAt: new Date('2024-01-01') },
  { id: '5', firstName: 'Sara', lastName: 'Nair', email: 'sara.nair@startup.io', phone: '+91 81234 56789', company: 'Launchpad', tag: 'work', notes: 'CTO. Very responsive on email.', createdAt: new Date('2024-04-20') },
];

@Injectable({ providedIn: 'root' })
export class ContactService {
  private load(): Contact[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return SEED;
      return JSON.parse(raw).map((c: Contact) => ({ ...c, createdAt: new Date(c.createdAt) }));
    } catch {
      return SEED;
    }
  }

  private save(contacts: Contact[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }

  getAll(): Contact[] {
    return this.load().sort((a, b) => a.firstName.localeCompare(b.firstName));
  }

  getById(id: string): Contact | undefined {
    return this.load().find(c => c.id === id);
  }

  add(data: Omit<Contact, 'id' | 'createdAt'>): Contact {
    const contacts = this.load();
    const contact: Contact = { ...data, id: crypto.randomUUID(), createdAt: new Date() };
    contacts.push(contact);
    this.save(contacts);
    return contact;
  }

  delete(id: string): void {
    this.save(this.load().filter(c => c.id !== id));
  }
}
