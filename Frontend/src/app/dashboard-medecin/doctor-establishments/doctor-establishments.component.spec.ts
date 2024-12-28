import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorEstablishmentsComponent } from './doctor-establishments.component';

describe('DoctorEstablishmentsComponent', () => {
  let component: DoctorEstablishmentsComponent;
  let fixture: ComponentFixture<DoctorEstablishmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorEstablishmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorEstablishmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
