import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SauvegardeComponent } from './sauvegarde.component';

describe('SauvegardeComponent', () => {
  let component: SauvegardeComponent;
  let fixture: ComponentFixture<SauvegardeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SauvegardeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SauvegardeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
