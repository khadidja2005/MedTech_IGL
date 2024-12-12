import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentCardComponent } from './establishment-card.component';

describe('EstablishmentCardComponent', () => {
  let component: EstablishmentCardComponent;
  let fixture: ComponentFixture<EstablishmentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstablishmentCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstablishmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
