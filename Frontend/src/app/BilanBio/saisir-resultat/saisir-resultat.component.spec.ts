import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisirResultatComponent } from './saisir-resultat.component';

describe('SaisirResultatComponent', () => {
  let component: SaisirResultatComponent;
  let fixture: ComponentFixture<SaisirResultatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaisirResultatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaisirResultatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
