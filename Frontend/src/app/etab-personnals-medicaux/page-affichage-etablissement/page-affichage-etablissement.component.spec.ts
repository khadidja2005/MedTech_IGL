import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAffichageEtablissementComponent } from './page-affichage-etablissement.component';

describe('PageAffichageEtablissementComponent', () => {
  let component: PageAffichageEtablissementComponent;
  let fixture: ComponentFixture<PageAffichageEtablissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageAffichageEtablissementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAffichageEtablissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
