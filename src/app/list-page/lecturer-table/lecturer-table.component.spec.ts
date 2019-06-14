import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LecturerTableComponent} from './lecturer-table.component';

describe('LecturerTableComponent', () => {
  let component: LecturerTableComponent;
  let fixture: ComponentFixture<LecturerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LecturerTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
