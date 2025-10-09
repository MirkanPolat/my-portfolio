import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  http = inject(HttpClient);
  router = inject(Router);
  contactData = {
    name: '',
    email: '',
    message: '',
  };

  mailTest = false;
  privacyAccepted = false;

  formErrors = {
    name: '',
    email: '',
  };

  post = {
    endPoint: 'https://mirkanpolat.com/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };

  validateName(): boolean {
    const nameValue = this.contactData.name.trim();

    if (nameValue.length === 0) {
      this.formErrors.name = 'nameRequired';
      return false;
    }

    if (!/[a-zA-ZäöüÄÖÜß]/.test(nameValue)) {
      this.formErrors.name = 'nameMinLetter';
      return false;
    }

    this.formErrors.name = '';
    return true;
  }

  validateEmail(): boolean {
    const emailValue = this.contactData.email.trim();

    if (emailValue.length === 0) {
      this.formErrors.email = 'emailRequired';
      return false;
    }

    if (!emailValue.includes('@')) {
      this.formErrors.email = 'emailMissingAt';
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
      this.formErrors.email = 'emailInvalid';
      return false;
    }

    this.formErrors.email = '';
    return true;
  }

  isFormValid(contactForm: NgForm): boolean {
    const isNameValid = this.validateName();
    const isEmailValid = this.validateEmail();
    return (
      contactForm.form.valid &&
      this.privacyAccepted &&
      isNameValid &&
      isEmailValid
    );
  }

  openPrivacyPolicy(): void {
    this.router.navigate(['/privacy-policy']);
  }

  onSubmit(contactForm: NgForm): void {
    if (!this.isFormValid(contactForm)) {
      alert('Please fill out the form correctly and accept the privacy policy');
      return;
    }

    if (contactForm.submitted && contactForm.form.valid) {
      if (!this.mailTest) {
        this.http
          .post(this.post.endPoint, this.post.body(this.contactData))
          .subscribe({
            next: () => this.resetForm(contactForm),
            error: () => {},
            complete: () => {},
          });
      } else {
        this.resetForm(contactForm);
      }
    }
  }

  private resetForm(contactForm: NgForm): void {
    contactForm.resetForm();
    this.contactData = { name: '', email: '', message: '' };
    this.privacyAccepted = false;
    this.formErrors = { name: '', email: '' };
  }
}
