import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDriverComponent } from './display-driver.component';

describe('DriverListComponent', () => {
  let component: DisplayDriverComponent;
  let fixture: ComponentFixture<DisplayDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
