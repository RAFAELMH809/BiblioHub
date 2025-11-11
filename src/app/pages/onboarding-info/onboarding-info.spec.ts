import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingInfo } from './onboarding-info';

describe('OnboardingInfo', () => {
  let component: OnboardingInfo;
  let fixture: ComponentFixture<OnboardingInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
