import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanDisplayRadiologueComponent } from './bilan-display-radiologue.component';

describe('BilanDisplayRadiologueComponent', () => {
  let component: BilanDisplayRadiologueComponent;
  let fixture: ComponentFixture<BilanDisplayRadiologueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilanDisplayRadiologueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilanDisplayRadiologueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
