import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})

export class PrivacyPolicyComponent implements OnInit {
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    window.scrollTo(0, 0);
  }
  
  goBack() {
    this.router.navigate(['/']);
  }
  
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        block: 'center',
        inline: 'nearest'
      });
    }
  }
  
  callPhone() {
    window.location.href = 'tel:+4915202888042';
  }
  
  sendEmail() {
    window.location.href = 'mailto:kontakt@mirkanpolat.com';
  }
}
