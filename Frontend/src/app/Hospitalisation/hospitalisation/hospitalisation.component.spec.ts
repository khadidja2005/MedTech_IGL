import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalisationComponent } from './hospitalisation.component';

describe('HospitalisationComponent', () => {
  let component: HospitalisationComponent;
  let fixture: ComponentFixture<HospitalisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalisationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
