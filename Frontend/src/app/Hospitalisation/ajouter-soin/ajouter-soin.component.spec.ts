import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterSoinComponent } from './ajouter-soin.component';

describe('AjouterSoinComponent', () => {
  let component: AjouterSoinComponent;
  let fixture: ComponentFixture<AjouterSoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterSoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterSoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
