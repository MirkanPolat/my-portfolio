import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProjectService, Project } from '../../shared/services/project-data.service';

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.scss'
})
export class MyProjectsComponent {
  private projectService = inject(ProjectService);
  private router = inject(Router);
  
  introContent = {
    subtitle: 'MY CRAFT',
    title: 'Projects',
    description: 'Encourage people to take a look and interact with your projects. Highlight your approach to creating responsive, user-friendly projects with efficient code.'
  };

  // Projects aus dem Service laden
  projects: Project[] = this.projectService.getProjects();

  // Click-Handler für Project Details Button
  openProjectDetails(projectId: string): void {
    this.router.navigate(['/project', projectId]);
  }
}
