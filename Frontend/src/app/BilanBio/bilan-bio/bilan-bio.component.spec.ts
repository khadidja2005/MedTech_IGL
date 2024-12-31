import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanBioComponent } from './bilan-bio.component';

describe('BilanBioComponent', () => {
  let component: BilanBioComponent;
  let fixture: ComponentFixture<BilanBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilanBioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilanBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
