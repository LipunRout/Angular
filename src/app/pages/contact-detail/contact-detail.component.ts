import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit {
  contact: Contact | undefined;
  confirmDelete = false;

  constructor(private route: ActivatedRoute, private router: Router, private contactService: ContactService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.contact = this.contactService.getById(id);
    if (!this.contact) this.router.navigate(['/contacts']);
  }

  get initials(): string {
    if (!this.contact) return '';
    return (this.contact.firstName[0] + this.contact.lastName[0]).toUpperCase();
  }

  delete(): void {
    if (!this.contact) return;
    this.contactService.delete(this.contact.id);
    this.router.navigate(['/contacts']);
  }
}
