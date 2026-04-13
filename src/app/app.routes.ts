import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  {
    path: 'contacts',
    loadComponent: () =>
      import('./pages/contact-list/contact-list.component').then(m => m.ContactListComponent),
  },
  {
    path: 'contacts/add',
    loadComponent: () =>
      import('./pages/contact-add/contact-add.component').then(m => m.ContactAddComponent),
  },
  {
    path: 'contacts/:id',
    loadComponent: () =>
      import('./pages/contact-detail/contact-detail.component').then(m => m.ContactDetailComponent),
  },
  { path: '**', redirectTo: 'contacts' },
];