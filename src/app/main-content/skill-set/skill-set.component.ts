import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  icon: string;
  row: number;
}

@Component({
  selector: 'app-skill-set',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-set.component.html',
  styleUrl: './skill-set.component.scss'
})
export class SkillSetComponent {
  skills: Skill[] = [
    { name: 'HTML', icon: 'assets/Design-material/img/Skill-Icons/HTML.png', row: 1 },
    { name: 'CSS', icon: 'assets/Design-material/img/Skill-Icons/CSS.png', row: 1 },
    { name: 'JavaScript', icon: 'assets/Design-material/img/Skill-Icons/Js.png', row: 1 },
    { name: 'TypeScript', icon: 'assets/Design-material/img/Skill-Icons/Ts.png', row: 1 },
    { name: 'Angular', icon: 'assets/Design-material/img/Skill-Icons/Angular.png', row: 1 },
    { name: 'Bootstrap', icon: 'assets/Design-material/img/Skill-Icons/Bootstrap.png', row: 1 },
    { name: 'Firebase', icon: 'assets/Design-material/img/Skill-Icons/Firebase.png', row: 2 },
    { name: 'Git', icon: 'assets/Design-material/img/Skill-Icons/Git.png', row: 2 },
    { name: 'Rest-Api', icon: 'assets/Design-material/img/Skill-Icons/Rest-Api.png', row: 2 },
    { name: 'Scrum', icon: 'assets/Design-material/img/Skill-Icons/Scrum.png', row: 2 },
    { name: 'GitHub', icon: 'assets/Design-material/img/Skill-Icons/GitHub.png', row: 2 },
    { name: 'Material Design', icon: 'assets/Design-material/img/Skill-Icons/Material Design.png', row: 2 }
  ];

  getSkillsInRow(rowNumber: number): Skill[] {
    return this.skills.filter(skill => skill.row === rowNumber);
  }
}
