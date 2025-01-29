import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutdpiComponent } from './ajoutdpi.component';

describe('AjoutdpiComponent', () => {
  let component: AjoutdpiComponent;
  let fixture: ComponentFixture<AjoutdpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutdpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutdpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
