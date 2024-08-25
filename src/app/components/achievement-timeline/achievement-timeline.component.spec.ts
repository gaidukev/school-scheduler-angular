import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementTimelineComponent } from './achievement-timeline.component';

describe('AchievementTimelineComponent', () => {
  let component: AchievementTimelineComponent;
  let fixture: ComponentFixture<AchievementTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AchievementTimelineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AchievementTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
