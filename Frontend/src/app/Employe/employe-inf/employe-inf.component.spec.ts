import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeInfComponent } from './employe-inf.component';

describe('EmployeInfComponent', () => {
  let component: EmployeInfComponent;
  let fixture: ComponentFixture<EmployeInfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeInfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
