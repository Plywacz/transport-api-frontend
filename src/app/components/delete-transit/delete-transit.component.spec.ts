import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTransitComponent } from './delete-transit.component';

describe('DeleteTransitComponent', () => {
  let component: DeleteTransitComponent;
  let fixture: ComponentFixture<DeleteTransitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTransitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTransitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
