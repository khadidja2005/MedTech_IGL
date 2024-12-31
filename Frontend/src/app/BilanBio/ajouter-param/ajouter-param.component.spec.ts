import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterParamComponent } from './ajouter-param.component';

describe('AjouterParamComponent', () => {
  let component: AjouterParamComponent;
  let fixture: ComponentFixture<AjouterParamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterParamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
