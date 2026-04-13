import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models/contact.model';

@Pipe({ name: 'search', standalone: true, pure: false })
export class SearchPipe implements PipeTransform {
  transform(contacts: Contact[], query: string): Contact[] {
    if (!query.trim()) return contacts;
    const q = query.toLowerCase();
    return contacts.filter(c =>
      c.firstName.toLowerCase().includes(q) ||
      c.lastName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.tag.toLowerCase().includes(q)
    );
  }
}
