import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPanelComponentComponent } from './main-panel-component.component';

describe('MainPanelComponentComponent', () => {
  let component: MainPanelComponentComponent;
  let fixture: ComponentFixture<MainPanelComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainPanelComponentComponent]
    });
    fixture = TestBed.createComponent(MainPanelComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
