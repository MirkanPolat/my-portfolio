import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillSetComponent } from './skill-set/skill-set.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [HeroSectionComponent, AboutMeComponent, SkillSetComponent, MyProjectsComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}
