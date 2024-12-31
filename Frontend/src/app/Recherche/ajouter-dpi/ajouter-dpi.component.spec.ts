import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterDPIComponent } from './ajouter-dpi.component';

describe('AjouterDPIComponent', () => {
  let component: AjouterDPIComponent;
  let fixture: ComponentFixture<AjouterDPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterDPIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterDPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
