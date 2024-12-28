import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DPIManagementComponent } from './dpimanagement.component';

describe('DPIManagementComponent', () => {
  let component: DPIManagementComponent;
  let fixture: ComponentFixture<DPIManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DPIManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DPIManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
