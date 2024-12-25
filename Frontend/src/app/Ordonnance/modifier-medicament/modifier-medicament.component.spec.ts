import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierOrdonnanceComponent } from './modifier-medicament.component';

describe('ModifierOrdonnanceComponent', () => {
  let component: ModifierOrdonnanceComponent;
  let fixture: ComponentFixture<ModifierOrdonnanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierOrdonnanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierOrdonnanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
