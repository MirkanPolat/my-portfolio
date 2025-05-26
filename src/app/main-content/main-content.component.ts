import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [HeroSectionComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}
