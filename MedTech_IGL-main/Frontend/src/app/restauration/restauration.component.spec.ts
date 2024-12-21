import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurationComponent } from './restauration.component';

describe('RestaurationComponent', () => {
  let component: RestaurationComponent;
  let fixture: ComponentFixture<RestaurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
