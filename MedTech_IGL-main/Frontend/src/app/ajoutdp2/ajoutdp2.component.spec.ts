import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ajoutdp2Component } from './ajoutdp2.component';

describe('Ajoutdp2Component', () => {
  let component: Ajoutdp2Component;
  let fixture: ComponentFixture<Ajoutdp2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ajoutdp2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ajoutdp2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
