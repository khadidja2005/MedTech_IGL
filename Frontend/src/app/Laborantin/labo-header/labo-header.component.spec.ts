import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboHeaderComponent } from './labo-header.component';

describe('LaboHeaderComponent', () => {
  let component: LaboHeaderComponent;
  let fixture: ComponentFixture<LaboHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaboHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
