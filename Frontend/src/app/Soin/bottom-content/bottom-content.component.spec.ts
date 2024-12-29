import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomContentComponent } from './bottom-content.component';

describe('BottomContentComponent', () => {
  let component: BottomContentComponent;
  let fixture: ComponentFixture<BottomContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
