import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalisationDetailsComponent } from './hospitalisation-details.component';

describe('HospitalisationDetailsComponent', () => {
  let component: HospitalisationDetailsComponent;
  let fixture: ComponentFixture<HospitalisationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalisationDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalisationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
