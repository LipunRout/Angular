import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  searchQuery = '';
  activeTag: string = 'all';
  readonly tags = ['all', 'work', 'personal', 'family', 'other'];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getAll();
  }

  get filtered(): Contact[] {
    let list = this.contacts;
    if (this.activeTag !== 'all') list = list.filter(c => c.tag === this.activeTag);
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(c =>
        c.firstName.toLowerCase().includes(q) ||
        c.lastName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q)
      );
    }
    return list;
  }

  initials(c: Contact): string {
    return (c.firstName[0] + c.lastName[0]).toUpperCase();
  }

  delete(id: string, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.contactService.delete(id);
    this.contacts = this.contactService.getAll();
  }
}
