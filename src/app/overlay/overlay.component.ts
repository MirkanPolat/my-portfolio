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
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectService = inject(ProjectService);

  project: Project | undefined;
  allProjects: Project[] = this.projectService.getProjects();
  currentIndex = 0;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      this.project = this.projectService.getProjectById(projectId);
      this.currentIndex = this.allProjects.findIndex(p => p.id === projectId);
      
      if (!this.project) {
        this.router.navigate(['/']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const projectsElement = document.getElementById('projects');
        if (projectsElement) {
          projectsElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100);
    });
  }

  navigateToProject(direction: 'prev' | 'next'): void {
    if (direction === 'prev') {
      this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.allProjects.length - 1;
    } else {
      this.currentIndex = this.currentIndex < this.allProjects.length - 1 ? this.currentIndex + 1 : 0;
    }
    
    const newProject = this.allProjects[this.currentIndex];
    this.router.navigate(['/project', newProject.id]);
  }
}
