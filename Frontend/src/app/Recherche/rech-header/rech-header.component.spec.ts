import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechHeaderComponent } from './rech-header.component';

describe('RechHeaderComponent', () => {
  let component: RechHeaderComponent;
  let fixture: ComponentFixture<RechHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
