import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListEtablissemetsComponent } from './page-list-etablissemets.component';

describe('PageListEtablissemetsComponent', () => {
  let component: PageListEtablissemetsComponent;
  let fixture: ComponentFixture<PageListEtablissemetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageListEtablissemetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageListEtablissemetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
