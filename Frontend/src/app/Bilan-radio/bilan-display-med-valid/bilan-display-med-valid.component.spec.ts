import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanDisplayMedValidComponent } from './bilan-display-med-valid.component';

describe('BilanDisplayMedValidComponent', () => {
  let component: BilanDisplayMedValidComponent;
  let fixture: ComponentFixture<BilanDisplayMedValidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilanDisplayMedValidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilanDisplayMedValidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
