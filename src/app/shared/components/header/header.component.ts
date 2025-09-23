import { Component, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private translateService = inject(TranslateService);
  private router = inject(Router);
  
  isMenuOpen = false;
  currentLang = 'en';

  ngOnInit() {
    this.currentLang = this.translateService.currentLang || 'en';
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  switchLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'de' : 'en';
    this.translateService.use(this.currentLang);
  }

  isGerman(): boolean {
    return this.currentLang === 'de';
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition
      });
    }
  }

  navigateToHome() {
    // Navigiere zur Hauptseite falls wir nicht dort sind
    this.router.navigate(['/']).then(() => {
      // Scrolle zur Startseite
      window.scrollTo({
        top: 0
      });
    });
  }
}
