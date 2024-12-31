import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacieComponent } from './pharmacie.component';

describe('PharmacieComponent', () => {
  let component: PharmacieComponent;
  let fixture: ComponentFixture<PharmacieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
