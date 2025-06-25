import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  http = inject(HttpClient);

  contactData = {
    name: '',
    email: '',
    message: '',
  };

  mailTest = true; 
  privacyAccepted = false;

  post = {
    endPoint: 'https://deineDomain.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  isFormValid(contactForm: NgForm): boolean {
    return contactForm.form.valid && this.privacyAccepted;
  }

  onSubmit(contactForm: NgForm) {
    if (!this.isFormValid(contactForm)) {
      alert('Please fill out the form correctly and accept the privacy policy');
      return;
    }

    if (contactForm.submitted && contactForm.form.valid && !this.mailTest) {
      // PRODUCTION MODE: Email versenden
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            console.log('Email successfully sent!', response);
            contactForm.resetForm();
            this.contactData = { name: '', email: '', message: '' };
            this.privacyAccepted = false;
          },
          error: (error) => {
            console.error('Error sending email:', error);
          },
          complete: () => console.info('Send post complete'),
        });
    } else if (contactForm.submitted && contactForm.form.valid && this.mailTest) {
      // TEST MODE: Nur Console Log
      console.log('TEST MODE - Form Data:', this.contactData);
      contactForm.resetForm();
      this.contactData = { name: '', email: '', message: '' }; 
      this.privacyAccepted = false;
    }
  }
}
