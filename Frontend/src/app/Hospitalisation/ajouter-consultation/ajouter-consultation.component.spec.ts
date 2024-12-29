import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterConsultationComponent } from './ajouter-consultation.component';

describe('AjouterConsultationComponent', () => {
  let component: AjouterConsultationComponent;
  let fixture: ComponentFixture<AjouterConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
