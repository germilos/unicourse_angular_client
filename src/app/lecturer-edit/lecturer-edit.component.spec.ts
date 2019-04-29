import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerEditComponent } from './lecturer-edit.component';

describe('LecturerEditComponent', () => {
  let component: LecturerEditComponent;
  let fixture: ComponentFixture<LecturerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
