import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierSoinComponent } from './modifier-soin.component';

describe('ModifierSoinComponent', () => {
  let component: ModifierSoinComponent;
  let fixture: ComponentFixture<ModifierSoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierSoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierSoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

