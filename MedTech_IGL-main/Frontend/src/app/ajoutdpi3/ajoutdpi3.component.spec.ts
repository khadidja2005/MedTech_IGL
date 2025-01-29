import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ajoutdpi3Component } from './ajoutdpi3.component';

describe('Ajoutdpi3Component', () => {
  let component: Ajoutdpi3Component;
  let fixture: ComponentFixture<Ajoutdpi3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ajoutdpi3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ajoutdpi3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
