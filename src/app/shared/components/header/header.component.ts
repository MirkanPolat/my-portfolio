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
    
    if (!element) {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          const targetElement = document.getElementById(sectionId);
          if (targetElement) {
            let headerHeight = 80;
            
            if (sectionId === 'skills') {
              headerHeight = 0; 
            }
            
            const elementPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
              top: elementPosition
            });
          }
        }, 100);
      });
    } else {
      let headerHeight = 80;
      
      if (sectionId === 'skills') {
        headerHeight = 0; 
      }
      
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition
      });
    }
  }

  navigateToHome() {
    this.router.navigate(['/']).then(() => {
      window.scrollTo({
        top: 0
      });
    });
  }
}
