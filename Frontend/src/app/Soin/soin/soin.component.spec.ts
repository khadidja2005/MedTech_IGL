import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoinComponent } from './soin.component';

describe('SoinComponent', () => {
  let component: SoinComponent;
  let fixture: ComponentFixture<SoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
