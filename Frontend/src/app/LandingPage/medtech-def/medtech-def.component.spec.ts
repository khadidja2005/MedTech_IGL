import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedtechDefComponent } from './medtech-def.component';

describe('MedtechDefComponent', () => {
  let component: MedtechDefComponent;
  let fixture: ComponentFixture<MedtechDefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedtechDefComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedtechDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
