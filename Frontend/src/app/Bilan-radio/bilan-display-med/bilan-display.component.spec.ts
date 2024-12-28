import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanDisplayComponent } from './bilan-display.component';

describe('BilanDisplayComponent', () => {
  let component: BilanDisplayComponent;
  let fixture: ComponentFixture<BilanDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilanDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilanDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
