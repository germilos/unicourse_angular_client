import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerSelectComponent } from './lecturer-select.component';

describe('LecturerSelectComponent', () => {
  let component: LecturerSelectComponent;
  let fixture: ComponentFixture<LecturerSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturerSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturerSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
