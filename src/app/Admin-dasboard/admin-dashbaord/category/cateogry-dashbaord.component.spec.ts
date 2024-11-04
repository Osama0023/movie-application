import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatogoryDashboardComponent } from './cateogry-dashbaord.component';


describe('AdminDashbaordComponent', () => {
  let component: CatogoryDashboardComponent;
  let fixture: ComponentFixture<CatogoryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatogoryDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatogoryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
