import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingGenres } from './onboarding-genres';

describe('OnboardingGenres', () => {
  let component: OnboardingGenres;
  let fixture: ComponentFixture<OnboardingGenres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingGenres]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingGenres);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
