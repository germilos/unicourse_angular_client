import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-course-units',
  templateUrl: './course-units.component.html',
  styleUrls: ['./course-units.component.css']
})
export class CourseUnitsComponent implements OnInit {

  @Output() private formReady: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  private arrayGroup: FormGroup;
  private courseUnits;
  private descriptions: Array<boolean> = [];

  constructor(private fb: FormBuilder) {
    this.arrayGroup = this.fb.group({
      courseUnits: this.fb.array([this.createItem()])
    })
  }

  ngOnInit() {
    this.formReady.emit(this.arrayGroup);
  }

  createItem(): FormGroup {
    return this.fb.group({
      number: new FormControl({
        value: this.courseUnits ?
          this.courseUnits.controls[this.courseUnits.controls.length - 1]['controls'].number.value + 1 : 1, disabled: false
      }),
      name: '',
      description: ''
    });
  }

  deleteUnit(number: number): void {
    let numbers, index;
    this.courseUnits = this.arrayGroup.get('courseUnits') as FormArray;

    if (number === 0) {
      // TODO: Show message
      console.log("Cannot delete");
      return;
    }
    // Get all course unit numbers
    numbers = this.courseUnits.controls.map(current => {
      return current['controls'].number.value;
    });

    // Find delete's target index and remove
    index = numbers.indexOf(number + 1);
    if (index !== -1) {
      this.courseUnits.removeAt(index);
    }

    // Get new unit numbers and reset 
    numbers = this.courseUnits.controls.map((current: FormControl) => {
      return current['controls'].number.value;
    });
    for (let i = 1; i <= this.courseUnits.controls.length; i++) {
      this.courseUnits.controls[i - 1]['controls'].number.setValue(i);
    }
    this.formReady.emit(this.arrayGroup);
  }

  toggleDescription(number: number): boolean {
    this.arrayGroup.controls.courseUnits['controls'].forEach(el => {
      this.descriptions.push(false);
    });

    this.descriptions.forEach((el, i) => {
      if (i == number) {
        this.descriptions[i] = this.descriptions[i] ? false : true;
      } else {
        this.descriptions[i] = false;
      }
    });
    console.log(this.descriptions[number]);
    return this.descriptions[number];
  }

  addItem(): void {
    this.courseUnits = this.arrayGroup.get('courseUnits') as FormArray;
    if (this.courseUnits.controls[this.courseUnits.controls.length - 1].value.name !== '') {
      this.courseUnits.push(this.createItem());
    } else {
      alert("Please enter course unit name!");
    }
    this.formReady.emit(this.arrayGroup);
  }
}
