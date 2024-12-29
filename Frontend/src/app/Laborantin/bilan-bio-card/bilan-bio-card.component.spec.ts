import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanBioCardComponent } from './bilan-bio-card.component';

describe('BilanBioCardComponent', () => {
  let component: BilanBioCardComponent;
  let fixture: ComponentFixture<BilanBioCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilanBioCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilanBioCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
