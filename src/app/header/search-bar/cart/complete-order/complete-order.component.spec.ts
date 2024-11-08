import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteOrderComponent } from './complete-order.component';

describe('CompleteOrderComponent', () => {
  let component: CompleteOrderComponent;
  let fixture: ComponentFixture<CompleteOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleteOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompleteOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
