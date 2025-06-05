import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  privacyAccepted = false;

  onSubmit() {
    if (this.isFormValid()) {
      console.log('Form submitted:', this.contactForm);
      this.resetForm();
    }
  }

  isFormValid(): boolean {
    return this.contactForm.name.trim() !== '' && 
           this.contactForm.email.trim() !== '' && 
           this.contactForm.message.trim() !== '' && 
           this.privacyAccepted;
  }

  resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      message: ''
    };
    this.privacyAccepted = false;
  }
}
