import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateDirective } from "@ngx-translate/core";

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, TranslatePipe, TranslateDirective],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {
  frontendLetters: string[] = 'Frontend'.split('');
  developerLetters: string[] = 'DEVELOPER'.split('');

  ngAfterViewInit(): void {
    const letters = document.querySelectorAll('.letter');
    letters.forEach((letter) => {
      letter.addEventListener('mouseenter', () => {
        letter.classList.add('hovered');
        setTimeout(() => {
          letter.classList.remove('hovered');
        }, 400);
      });
    });
  }
}
