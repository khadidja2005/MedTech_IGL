import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterFilterComponent } from './ajouter-filter.component';

describe('AjouterFilterComponent', () => {
  let component: AjouterFilterComponent;
  let fixture: ComponentFixture<AjouterFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
