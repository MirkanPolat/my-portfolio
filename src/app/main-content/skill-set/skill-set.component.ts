import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from "@ngx-translate/core";

interface Skill {
  name: string;
  icon: string;
  row: number;
}

@Component({
  selector: 'app-skill-set',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './skill-set.component.html',
  styleUrl: './skill-set.component.scss'
})

export class SkillSetComponent {
  stickerState: 'default' | 'transition' | 'peeled' = 'default';

  skills: Skill[] = [
    { name: 'HTML', icon: 'assets/img/Skill-Icons/HTML.svg', row: 1 },
    { name: 'CSS', icon: 'assets/img/Skill-Icons/CSS.svg', row: 1 },
    { name: 'JavaScript', icon: 'assets/img/Skill-Icons/Js.svg', row: 1 },
    { name: 'TypeScript', icon: 'assets/img/Skill-Icons/Ts.svg', row: 1 },
    { name: 'Angular', icon: 'assets/img/Skill-Icons/Angular.svg', row: 1 },
    { name: 'Bootstrap', icon: 'assets/img/Skill-Icons/Bootstrap.png', row: 1 },
    { name: 'Firebase', icon: 'assets/img/Skill-Icons/Firebase.svg', row: 2 },
    { name: 'Git', icon: 'assets/img/Skill-Icons/Git.svg', row: 2 },
    { name: 'Rest-Api', icon: 'assets/img/Skill-Icons/Rest-Api.svg', row: 2 },
    { name: 'Scrum', icon: 'assets/img/Skill-Icons/Scrum.svg', row: 2 },
    { name: 'GitHub', icon: 'assets/img/Skill-Icons/GitHub.ico', row: 2 },
    { name: 'Material Design', icon: 'assets/img/Skill-Icons/Material-Design.svg', row: 2 }
  ];

  peelSticker(): void {
    if (this.stickerState === 'default') {
      this.stickerState = 'transition';
    
      setTimeout(() => {
        this.stickerState = 'peeled';
      }, 200);
    } else {
      this.stickerState = 'default';
    }
  }

  getSkillsInRow(rowNumber: number): Skill[] {
    return this.skills.filter(skill => skill.row === rowNumber);
  }
}
