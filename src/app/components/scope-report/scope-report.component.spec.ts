import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeReportComponent } from './scope-report.component';

describe('ScopeReportComponent', () => {
  let component: ScopeReportComponent;
  let fixture: ComponentFixture<ScopeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScopeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
