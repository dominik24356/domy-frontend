import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsPopoverComponent } from './labels-popover.component';

describe('LabelsDialogComponent', () => {
  let component: LabelsPopoverComponent;
  let fixture: ComponentFixture<LabelsPopoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabelsPopoverComponent]
    });
    fixture = TestBed.createComponent(LabelsPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
