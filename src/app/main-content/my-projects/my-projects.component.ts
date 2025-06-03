import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: string;
  title: string;
  description: string;
  featured?: boolean;
}

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.scss'
})
export class MyProjectsComponent {
  
  introContent = {
    subtitle: 'MY CRAFT',
    title: 'Projects',
    description: 'Encourage people to take a look and interact with your projects. Highlight your approach to creating responsive, user-friendly projects with efficient code.'
  };

  projects: Project[] = [
    {
      id: 'join',
      title: 'Join',
      description: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      featured: true
    },
    {
      id: 'el-pollo-loco',
      title: 'El Pollo Loco',
      description: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.'
    },
    {
      id: 'dabubble',
      title: 'DABubble',
      description: 'This App is a Slack Clone App. It revolutionizes team communication and collaboration with its intuitive interface, real-time messaging, and robust channel organization.'
    }
  ];
}
