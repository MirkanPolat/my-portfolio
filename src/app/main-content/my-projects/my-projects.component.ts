import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProjectService, Project } from '../../shared/services/project-data.service';
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.scss'
})
export class MyProjectsComponent implements OnInit, OnDestroy {
  private projectService = inject(ProjectService);
  private router = inject(Router);
  private translateService = inject(TranslateService);
  private langChangeSubscription?: Subscription;
  
  introContent = {
    subtitle: 'projects.intro.subtitle',
    title: 'projects.intro.title', 
    description: 'projects.intro.description'
  };

  projects: Project[] = [];

  ngOnInit() {
    this.projects = this.projectService.getProjects();
    
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(() => {
      this.projects = this.projectService.getProjects();
    });
  }

  ngOnDestroy() {
    this.langChangeSubscription?.unsubscribe();
  }

  openProjectDetails(projectId: string): void {
    this.router.navigate(['/project', projectId]);
  }
}
