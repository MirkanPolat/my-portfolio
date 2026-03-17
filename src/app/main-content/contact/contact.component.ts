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

  honeypot = '';
  mailTest = false;
  privacyAccepted = false;
  showSuccessMessage = false;

  formErrors = {
    name: '',
    email: '',
  };

  post = {
    endPoint: 'https://mirkanpolat.com/sendMail.php',
    body: (payload: any) => JSON.stringify({ ...payload, website: this.honeypot }),
    options: {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  };

  validateName(): boolean {
    const nameValue = this.contactData.name.trim();

    if (nameValue.length === 0) {
      return false;
    }

    const letterCount = (nameValue.match(/[a-zA-ZäöüÄÖÜß]/g) || []).length;
    if (letterCount < 2) {
      return false;
    }

    return true;
  }

  onNameBlur(): void {
    const nameValue = this.contactData.name.trim();

    if (nameValue.length === 0) {
      this.formErrors.name = 'nameRequired';
    } else {
      const letterCount = (nameValue.match(/[a-zA-ZäöüÄÖÜß]/g) || []).length;
      if (letterCount < 2) {
        this.formErrors.name = 'nameMinLetter';
      } else {
        this.formErrors.name = '';
      }
    }
  }

  onNameInput(): void {
    const nameValue = this.contactData.name.trim();
    
    if (nameValue.length === 0) {
      this.formErrors.name = 'nameRequired';
    } else {
      const letterCount = (nameValue.match(/[a-zA-ZäöüÄÖÜß]/g) || []).length;
      if (letterCount < 2) {
        this.formErrors.name = 'nameMinLetter';
      } else {
        this.formErrors.name = '';
      }
    }
  }

  validateEmail(): boolean {
    const emailValue = this.contactData.email.trim();

    if (emailValue.length === 0) {
      return false;
    }

    if (!emailValue.includes('@')) {
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
      return false;
    }

    return true;
  }

  onEmailBlur(): void {
    const emailValue = this.contactData.email.trim();

    if (emailValue.length === 0) {
      this.formErrors.email = 'emailRequired';
    } else if (!emailValue.includes('@')) {
      this.formErrors.email = 'emailMissingAt';
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailValue)) {
        this.formErrors.email = 'emailInvalid';
      } else {
        this.formErrors.email = '';
      }
    }
  }

  onEmailInput(): void {
    const emailValue = this.contactData.email.trim();
    
    if (emailValue.length === 0) {
      this.formErrors.email = 'emailRequired';
    } else if (!emailValue.includes('@')) {
      this.formErrors.email = 'emailMissingAt';
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailValue)) {
        this.formErrors.email = 'emailInvalid';
      } else {
        this.formErrors.email = '';
      }
    }
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
      return;
    }

    if (contactForm.submitted && contactForm.form.valid) {
      if (!this.mailTest) {
        this.http
          .post(this.post.endPoint, this.post.body(this.contactData), this.post.options)
          .subscribe({
            next: () => {
              this.showSuccessMessage = true;
              this.resetForm(contactForm);
              setTimeout(() => {
                this.showSuccessMessage = false;
              }, 5000);
            },
            error: () => {
              alert(
                'Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.'
              );
            },
            complete: () => {},
          });
      } else {
        this.showSuccessMessage = true;
        this.resetForm(contactForm);
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
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
