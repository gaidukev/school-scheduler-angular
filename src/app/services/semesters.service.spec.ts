import { TestBed } from '@angular/core/testing';

import { SemestersService } from './semesters.service';


describe('SemestersService', () => {
  let service: SemestersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SemestersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
