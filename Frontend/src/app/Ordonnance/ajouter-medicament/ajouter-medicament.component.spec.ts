import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterMedicamentComponent } from './ajouter-medicament.component';

describe('AjouterMedicamentComponent', () => {
  let component: AjouterMedicamentComponent;
  let fixture: ComponentFixture<AjouterMedicamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterMedicamentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterMedicamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
