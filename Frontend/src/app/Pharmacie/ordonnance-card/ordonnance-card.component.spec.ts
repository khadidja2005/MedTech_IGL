import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdonnanceCardComponent } from './ordonnance-card.component';

describe('OrdonnanceCardComponent', () => {
  let component: OrdonnanceCardComponent;
  let fixture: ComponentFixture<OrdonnanceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdonnanceCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdonnanceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
