import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  ViewChild,
  OnChanges,
  Renderer2,
  ElementRef
} from '@angular/core';
import {FormGroup, FormBuilder, Validator, Validators, FormArray} from '@angular/forms';
import {Lecturer} from 'src/app/lecturer';
import {LecturerService} from 'src/app/shared/lecturer/lecturer.service';
import {Course} from 'src/app/course';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-lecturer-select',
  templateUrl: './lecturer-select.component.html',
  styleUrls: ['./lecturer-select.component.css']
})
export class LecturerSelectComponent implements OnInit, OnChanges {

  @Output() private formReady: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Input() private course: Course;
  private readonly formGroup: FormGroup;
  private selectLecturers: Lecturer[];
  private lecturers: Lecturer[];
  private flag = false;
  searchTextLecturers: string;
  searchTextSelectLecturers: string;

  @ViewChild('selectLecturersFilter') selectLecturersInput: ElementRef;
  @ViewChild('lecturersFilter') lecturersInput: ElementRef;

  constructor(private fb: FormBuilder,
              private lecturerService: LecturerService,
              private renderer: Renderer2) {
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

  // Executed only once after course is loaded
  ngOnChanges() {
    if (this.course && this.course.lecturers && !this.flag) {
      this.flag = true;
      this.course.lecturers.forEach((lecturer: Lecturer) => {
        console.log(this.formGroup);
        this.formGroup.controls['lecturers'].value
          .push(lecturer);
        this.lecturers.push(lecturer);
        this.selectLecturers.splice(this.selectLecturers.map(function (e) {
          return e.id;
        }).indexOf(lecturer.id), 1);
      });
      this.formReady.emit(this.formGroup);
    }
  }

  filterLecturers(event: any): void {
    if ('lecturersFilter' === event.target.id) {
      this.searchTextLecturers = event.target.value;
    } else {
      this.searchTextSelectLecturers = event.target.value;
    }
  }

  clearInputs(): void {
    this.renderer.selectRootElement(this.selectLecturersInput['nativeElement']).value = '';
    this.renderer.selectRootElement(this.lecturersInput['nativeElement']).value = '';
    this.searchTextLecturers = '';
    this.searchTextSelectLecturers = '';
  }


  // Swap only selected lecturers
  swapLecturers(from: string, to: string, lecturersToSwap?: Lecturer[]) {
    // Get the highlighted (selected) lecturers
    const lecturersForSwap = lecturersToSwap ? lecturersToSwap : this.formGroup.controls[from].value.map(result => {
      return result;
    });
    // Moves from origin to destination select list
    lecturersForSwap.forEach((lecturer: Lecturer) => {
      this[from].splice(this[from].indexOf(lecturer), 1);
      this[to].push(lecturer);
    });

    // Unselect lecturers in 'selectLecturers'
    this.formGroup.controls['selectLecturers'].setValue([]);
    this.formGroup.controls['lecturers'].setValue([]);
    // Mark all Lecturers in 'lecturers' element as selected
    this.lecturers.forEach((lecturer: Lecturer) => {
      this.formGroup.controls['lecturers'].value.push(lecturer);
    });
    this.formReady.emit(this.formGroup);

    this.clearInputs();
  }

  swapLecturersAll(from: string, to: string): void {

    // Get all lecturers from origin select list
    const lecturersForSwap = this[from].map(result => {
      return result;
    });

    /*
     * Iterate through origin and push to destination list (control and HTML)
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

    this.clearInputs();
  }
}
