import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, SelectMultipleControlValueAccessor } from '@angular/forms';
import { Lecturer } from 'src/app/lecturer';
import { LecturerService } from 'src/app/shared/lecturer/lecturer.service';
import { SelectLecturersDirective } from 'src/app/select-lecturers.directive';

@Component({
  selector: 'app-lecturer-select',
  templateUrl: './lecturer-select.component.html',
  styleUrls: ['./lecturer-select.component.css']
})
export class LecturerSelectComponent implements OnInit {

  @Output() private formReady: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Input() private course: any;
  private formGroup: FormGroup;
  private selectLecturers: Lecturer[];
  private lecturers: Lecturer[];
  private flag: boolean = false;

  constructor(private fb: FormBuilder,
    private lecturerService: LecturerService) {
    this.formGroup = this.fb.group({
      selectLecturers: [[]],
      lecturers: [[]]
    });
  }

  ngOnInit() {
    this.selectLecturers = [];
    this.lecturers = [];
    this.lecturerService.getAll()
      .subscribe((res: Lecturer[]) => {
        this.selectLecturers = res;
      });
  }

  // Executed only once course is loaded
  ngOnChanges() {
    if (this.course.lecturers && !this.flag) {
      this.flag = true;
      this.course.lecturers.forEach((lecturer: Lecturer) => {
        this.formGroup.controls['lecturers'].value
          .push(lecturer);
        this.lecturers.push(lecturer);
        this.selectLecturers.splice(this.selectLecturers.map(function (e) {
          return e.id;
        }).indexOf(lecturer.id), 1);
      });
    }
  }

  // Swap only selected lecturers
  swapLecturers(from: string, to: string) {

    // Get the highlighted (selected) lecturers
    let lecturersForSwap = this.formGroup.controls[from].value.map(result => {
      return result;
    });

    // Moves from origin to destination select list
    lecturersForSwap.forEach((lecturer: Lecturer) => {
      this[from].splice(this[from].indexOf(lecturer), 1); this.formGroup.controls[to].value.push(lecturer);
      this.formGroup.controls[from].value.splice(
        this.formGroup.controls[from].value.indexOf(lecturer), 1);
      this[to].push(lecturer);
    });

    // Unselect lecturers in 'selectLecturers'
    this.formGroup.controls['selectLecturers'].setValue([]);

    // Mark all Lecturers in 'lecturers' element as selected
    this.lecturers.forEach((lecturer: Lecturer) => {
      this.formGroup.controls['lecturers'].value.push(lecturer);
    });
    this.formReady.emit(this.formGroup);
  }

  swapLecturersAll(from: string, to: string): void {

    // Get all lecturers from origin select list
    let lecturersForSwap = this[from].map(result => {
      return result;
    });

    /*
     * Iterate thorugh origin and push to destination list (control and HTML)
     * element
     * Splice from origin
     */
    lecturersForSwap.forEach((lecturer: Lecturer) => {
      this[to].push(lecturer);
      this.formGroup.controls[to].value.push(lecturer);
      this.formGroup.controls[from].value.splice(
        this.formGroup.controls[from].value.indexOf(lecturer), 1);
      this[from].splice(this[from].indexOf(lecturer), 1);
    });

    this.formReady.emit(this.formGroup);
  }
}
