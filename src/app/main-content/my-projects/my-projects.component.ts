import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProjectService, Project } from '../../shared/services/project-data.service';
import { TranslatePipe, TranslateDirective } from "@ngx-translate/core";

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule, TranslatePipe, TranslateDirective],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.scss'
})
export class MyProjectsComponent {
  private projectService = inject(ProjectService);
  private router = inject(Router);
  
  introContent = {
    subtitle: 'projects.intro.subtitle',
    title: 'projects.intro.title', 
    description: 'projects.intro.description'
  };

  // Projects aus dem Service laden
  projects: Project[] = this.projectService.getProjects();

  // Click-Handler für Project Details Button
  openProjectDetails(projectId: string): void {
    this.router.navigate(['/project', projectId]);
  }
}
