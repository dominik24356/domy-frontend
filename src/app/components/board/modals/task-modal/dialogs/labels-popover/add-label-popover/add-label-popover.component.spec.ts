import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLabelPopoverComponent } from './add-label-popover.component';

describe('LabelsDialogComponent', () => {
  let component: AddLabelPopoverComponent;
  let fixture: ComponentFixture<AddLabelPopoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLabelPopoverComponent]
    });
    fixture = TestBed.createComponent(AddLabelPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
