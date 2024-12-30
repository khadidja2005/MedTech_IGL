import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationInfoComponent } from './consultation-info.component';

describe('ConsultationInfoComponent', () => {
  let component: ConsultationInfoComponent;
  let fixture: ComponentFixture<ConsultationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
