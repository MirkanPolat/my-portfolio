import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillSetComponent } from './skill-set/skill-set.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ContactComponent } from './contact/contact.component';
@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [HeroSectionComponent, AboutMeComponent, SkillSetComponent, MyProjectsComponent, TestimonialsComponent, ContactComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}
