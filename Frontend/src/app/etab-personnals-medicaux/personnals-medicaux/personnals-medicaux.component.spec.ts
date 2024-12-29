import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnalsMedicauxComponent } from './personnals-medicaux.component';

describe('PersonnalsMedicauxComponent', () => {
  let component: PersonnalsMedicauxComponent;
  let fixture: ComponentFixture<PersonnalsMedicauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnalsMedicauxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnalsMedicauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
