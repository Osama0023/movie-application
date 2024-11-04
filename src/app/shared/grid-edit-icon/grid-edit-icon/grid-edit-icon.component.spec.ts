import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridEditIconComponent } from './grid-edit-icon.component';

describe('GridEditIconComponent', () => {
  let component: GridEditIconComponent;
  let fixture: ComponentFixture<GridEditIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridEditIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridEditIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
