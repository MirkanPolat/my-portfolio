import { Injectable } from '@angular/core';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  featured?: boolean;
  badgeImage?: string;
  // Zusätzliche Properties nur für die Overlay-Ansicht
  implementationDetails?: string;
  duration?: string;
  technologies?: string[]; // Array für die Tech-Icons
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[] = [
    {
      id: 'join',
      title: 'Join',
      description: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      featured: true,
      badgeImage: 'assets/Design-material/03_Stickers/project_imgs/featured.svg',
      image: 'assets/Design-material/03_Stickers/project_imgs/Laptop.svg',
      // Overlay-spezifische Daten
      implementationDetails: 'This project was implemented using Angular 17 with standalone components. The backend utilizes Firebase for real-time data synchronization and user authentication. The drag-and-drop functionality was built with Angular CDK.',
      duration: '3 months',
      technologies: ['Angular', 'TypeScript', 'Firebase', 'HTML', 'CSS', 'JavaScript']
    },
    {
      id: 'el-pollo-loco',
      title: 'El Pollo Loco',
      description: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',
      image: 'assets/Design-material/03_Stickers/project_imgs/El-Pollo-Loco.svg',
      implementationDetails: 'Built entirely with vanilla JavaScript using object-oriented programming principles. The game engine uses HTML5 Canvas for rendering and handles collision detection, animations, and game state management.',
      duration: '2 months',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Canvas']
    },
    {
      id: 'dabubble',
      title: 'DABubble',
      description: 'This App is a Slack Clone App. It revolutionizes team communication and collaboration with its intuitive interface, real-time messaging, and robust channel organization.',
      image: 'assets/Design-material/03_Stickers/project_imgs/DABubble.svg',
      implementationDetails: 'Developed as a comprehensive team communication platform using Angular and Firebase. Features include real-time messaging, channel management, file sharing, and user presence indicators. The app uses RxJS for reactive programming patterns.',
      duration: '4 months',
      technologies: ['Angular', 'TypeScript', 'Firebase', 'RxJS', 'SCSS', 'HTML']
    }
  ];

  getProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find(project => project.id === id);
  }
}
