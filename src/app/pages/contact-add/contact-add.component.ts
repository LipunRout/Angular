import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-add',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css'],
})
export class ContactAddComponent {
  form: FormGroup;
  submitted = false;
  readonly tags = ['work', 'personal', 'family', 'other'];

  constructor(private fb: FormBuilder, private contactService: ContactService, private router: Router) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName:  ['', [Validators.required, Validators.minLength(2)]],
      email:     ['', [Validators.required, Validators.email]],
      phone:     [''],
      company:   [''],
      tag:       ['work', Validators.required],
      notes:     [''],
    });
  }

  get f() { return this.form.controls; }

  get previewInitials(): string {
    const fn = this.f['firstName'].value?.[0] ?? '';
    const ln = this.f['lastName'].value?.[0] ?? '';
    return (fn + ln).toUpperCase() || '?';
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) return;
    const contact = this.contactService.add(this.form.value);
    this.router.navigate(['/contacts', contact.id]);
  }
}
