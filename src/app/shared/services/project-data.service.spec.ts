import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project-data.service';

describe('ProjectDataService', () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
