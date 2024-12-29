import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveHeaderComponent } from './archive-header.component';

describe('ArchiveHeaderComponent', () => {
  let component: ArchiveHeaderComponent;
  let fixture: ComponentFixture<ArchiveHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
