import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService, Project } from '../shared/services/project-data.service';
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss'
})

export class OverlayComponent implements OnInit {
  private static readonly SCROLL_DELAY = 100;
  private static readonly PROJECTS_ELEMENT_ID = 'projects';
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectService = inject(ProjectService);

  project: Project | undefined;
  allProjects: Project[] = this.projectService.getProjects();
  currentIndex = 0;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadProject(params['id']);
    });
  }

  private loadProject(projectId: string): void {
    this.project = this.projectService.getProjectById(projectId);
    this.currentIndex = this.allProjects.findIndex(p => p.id === projectId);
    
    if (!this.project) {
      this.redirectToHome();
    }
  }

  private redirectToHome(): void {
    this.router.navigate(['/']);
  }

  goBack(): void {
    this.router.navigate(['/']).then(() => {
      this.scrollToProjects();
    });
  }

  private scrollToProjects(): void {
    setTimeout(() => {
      const projectsElement = document.getElementById(OverlayComponent.PROJECTS_ELEMENT_ID);
      projectsElement?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, OverlayComponent.SCROLL_DELAY);
  }

  navigateToProject(direction: 'prev' | 'next'): void {
    this.currentIndex = this.getNextIndex(direction);
    const newProject = this.allProjects[this.currentIndex];
    this.router.navigate(['/project', newProject.id]);
  }

  private getNextIndex(direction: 'prev' | 'next'): number {
    const maxIndex = this.allProjects.length - 1;
    
    if (direction === 'prev') {
      return this.currentIndex > 0 ? this.currentIndex - 1 : maxIndex;
    }
    
    return this.currentIndex < maxIndex ? this.currentIndex + 1 : 0;
  }
}
