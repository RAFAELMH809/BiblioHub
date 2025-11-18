import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTile } from './category-tile';

describe('CategoryTile', () => {
  let component: CategoryTile;
  let fixture: ComponentFixture<CategoryTile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryTile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryTile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
