import { Component, OnInit, Input, Output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-course-units',
  templateUrl: './course-units.component.html',
  styleUrls: ['./course-units.component.css']
})
export class CourseUnitsComponent implements OnInit {

  @Input() courseUnitArray: FormArray;
  @Output() deleteUnitEmitter = new EventEmitter();
  @Output() toggleDescriptionEmitter = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
    console.log("Cu ARRAY", this.courseUnitArray);
  }

  deleteUnit(number: number): void {
    let numbers, index;
    // this.courseUnitArray = this.courseForm.get('courseUnits') as FormArray;

    if (number === 0) {
      // TODO: Show message
      console.log("Cannot delete");
      return;
    }
    // Get all course unit numbers
    numbers = this.courseUnitArray.controls.map(current => {
      return current['controls'].number.value;
    });

    // Find delete's target index and remove
    index = numbers.indexOf(number + 1);
    if (index !== -1) {
      this.courseUnitArray.removeAt(index);
    }

    // Get new unit numbers and reset 
    numbers = this.courseUnitArray.controls.map(current => {
      return current['controls'].number.value;
    });
    for (let i = 1; i <= this.courseUnitArray.controls.length; i++) {
      this.courseUnitArray.controls[i - 1]['controls'].number.setValue(i);
    }
  }

  toggleDescription(number: number): void {

  }

}
