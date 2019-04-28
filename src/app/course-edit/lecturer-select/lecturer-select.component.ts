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
  @Input() course: any;
  private formGroup: FormGroup;
  private selectLecturers: Lecturer[];
  private lecturers: Lecturer[];
  @ViewChild('selLects') selLects;
  @ViewChild('selectedLecturers') selectdLects;
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
    // this.formReady.emit(this.formGroup);
    this.lecturerService.getAll()
      .subscribe((res: Lecturer[]) => {
        this.selectLecturers = res;
      });
  }

  ngOnChanges() {
    console.log("final group: ", this.formGroup.controls.lecturers.value);
    if (this.course && this.course.lecturers.length != 0 && !this.flag) {
      this.flag = true;
      console.log("Course lecturers: ", this.course.lecturers);
      let controlLects = <FormControl>this.formGroup.controls.lecturers;
      console.log("Aha lecturers: ", this.formGroup.controls.lecturers.value);
      for (let i = 0; i < this.course.lecturers.length; i++) {
        controlLects.value.push(this.course.lecturers[i]);
        this.lecturers.push(this.course.lecturers[i]);
        this.selectLecturers.splice(this.selectLecturers.map(function (e) {
          return e.id;
        }).indexOf(this.course.lecturers[i].id), 1);
      }
      
      console.log("Pushed: ", controlLects.value);
    }
  }

  // TODO: Refactor for immutability
  swapLecturers(from: string, to: string) {
    let lecturersForSwap = this.formGroup.controls[from].value.map(result => {
      return result;
    });

    for (let i = 0; i < lecturersForSwap.length; i++) {
      // this.formGroup.controls[to].value.push(lecturersForSwap[i]);
      this[from].splice(this[from].indexOf(lecturersForSwap[i]), 1);
      this[to].push(lecturersForSwap[i]);
      // this.formGroup.controls[from].value.splice(
      //   this.formGroup.controls[from].value.indexOf(lecturersForSwap[i]), 1);

    }
    
    this.formGroup.controls['selectLecturers'].setValue([]);
    this.formGroup.controls['lecturers'].setValue([]);
    console.log("Lecturers before adding: ", this.formGroup.controls['lecturers'].value);
    for(let i = 0; i < this.lecturers.length; i++) {
      this.formGroup.controls['lecturers'].value.push(this.lecturers[i]);
    }
    console.log("Lecturers after adding: ", this.formGroup.controls['lecturers'].value);
    this.formReady.emit(this.formGroup);
  }

  swapLecturersAll(from: string, to: string): void {
    // Get all lecturers from source list
    console.log(from + " ", this.formGroup.controls[from].value);
    console.log(to + " ", this.formGroup.controls[to].value);
    let lecturersForSwap = this[from].map(result => {
      return result;
    });

    /*
     * Iterate thorugh source and push to target list (control and HTML element)
     * Splice from source
     */
    for (let i = 0; i < lecturersForSwap.length; i++) {
      this[to].push(lecturersForSwap[i]);
      this.formGroup.controls[to].value.push(lecturersForSwap[i]);
      this.formGroup.controls[from].value.splice(
        this.formGroup.controls[from].value.indexOf(lecturersForSwap[i]), 1);
      this[from].splice(this[from].indexOf(lecturersForSwap[i]), 1);
    }

    this.formReady.emit(this.formGroup);
  }
}
