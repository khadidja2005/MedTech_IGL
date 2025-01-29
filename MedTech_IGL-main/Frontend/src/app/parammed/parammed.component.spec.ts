import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParammedComponent } from './parammed.component';

describe('ParammedComponent', () => {
  let component: ParammedComponent;
  let fixture: ComponentFixture<ParammedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParammedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParammedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
