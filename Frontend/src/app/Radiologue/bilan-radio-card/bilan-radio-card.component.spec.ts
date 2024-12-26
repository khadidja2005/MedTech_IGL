import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanRadioCardComponent } from './bilan-radio-card.component';

describe('BilanRadioCardComponent', () => {
  let component: BilanRadioCardComponent;
  let fixture: ComponentFixture<BilanRadioCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilanRadioCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilanRadioCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
