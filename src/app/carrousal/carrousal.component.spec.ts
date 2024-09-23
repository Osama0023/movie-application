import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrousalComponent } from './carrousal.component';

describe('CarrousalComponent', () => {
  let component: CarrousalComponent;
  let fixture: ComponentFixture<CarrousalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarrousalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarrousalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
