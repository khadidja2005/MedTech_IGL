import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierDetailsComponent } from './modifier-details.component';

describe('ModifierDetailsComponent', () => {
  let component: ModifierDetailsComponent;
  let fixture: ComponentFixture<ModifierDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
