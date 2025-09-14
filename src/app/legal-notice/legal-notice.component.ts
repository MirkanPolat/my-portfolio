import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})

export class LegalNoticeComponent implements OnInit {
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    window.scrollTo(0, 0);
  }
  
  goBack() {
    this.router.navigate(['/']);
  }
  
  callPhone() {
    window.location.href = 'tel:+4915202888042';
  }
  
  sendEmail() {
    window.location.href = 'mailto:kontakt@mirkanpolat.com';
  }
}
