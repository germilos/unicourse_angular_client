import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../shared/course/course.service';
import { StudyProgramService } from '../shared/study-program/study-program.service';
import { DepartmentService } from '../shared/department/department.service';
import { LecturerService } from '../shared/lecturer/lecturer.service';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';

/*
** Entire code to be refactored upon achieving complete functionality
*/

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  course: any = {};
  studyPrograms: Array<any>;
  departments: Array<any>;
  // Lecturers not selected for POST/PUT
  selectLecturers: Array<any> = [];
  // Selected lecturers
  lecturers: Array<any> = [];
  courseForm: FormGroup;
  courseUnits: FormArray;
  sub: Subscription;
  descriptions: Array<boolean> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private studyProgramService: StudyProgramService,
    private lecturerService: LecturerService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      id: '',
      name: '',
      espb: '',
      goal: '',
      status: '',
      department: '',
      studyProgram: '',
      selectLecturers: [[]],
      lecturers: [[]],
      courseUnits: this.formBuilder.array([this.createItem()])
    });

    this.requestDataFromMultipleSources().subscribe(responseList => {
      this.selectLecturers = responseList[0];
      this.departments = responseList[1];
      this.studyPrograms = responseList[2];
      this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        // if "id" exists, retrieve course from DB and assign to course variable
        this.courseService.get(id).subscribe((course: any) => {
          if (course) {
            console.log("COURSE: ", course);
            this.course = course;
            this.courseForm.patchValue({
              id: this.course.id,
              name: this.course.name,
              espb: this.course.espb,
              goal: this.course.goal,
              status: this.course.status,
              department: this.departments.filter(d => d.id === this.course.department.id)[0],
              studyProgram: this.studyPrograms.filter(sp => sp.id === this.course.studyProgram.id)[0]
            })
            this.populateCourseUnits();
            let controlLects = <FormControl> this.courseForm.controls.lecturers;
            for (let i = 0; i < this.course.lecturers.length; i++) {
                controlLects.value.push(this.course.lecturers[i]);
                this.lecturers.push(this.course.lecturers[i]);
                this.selectLecturers.splice(this.selectLecturers.map(function(e) { 
                  return e.id; 
                }).indexOf(this.course.lecturers[i].id), 1);
            }
          } else {
            console.log(`Course with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
    }) 
  }

  
  private requestDataFromMultipleSources(): Observable<any[]> {
    let lecturers = this.lecturerService.getAll();
    let departments = this.departmentService.getAll();
    let studyPrograms = this.studyProgramService.getAll();
    
    return forkJoin([lecturers, departments, studyPrograms]);
  }

  populateCourseUnits() {
    let control = <FormArray>this.courseForm.get('courseUnits');
    // let control = <FormArray>this.courseForm.controls.courseUnits;
    control.removeAt(0);
    console.log(this.course.courseUnits);
    this.course.courseUnits.forEach(x => {
      control.push(this.formBuilder.group({
        number: new FormControl({ value: x.number, disabled: false}),
        name: x.name,
        description: x.description
      }))
    })
    return control;
  }

  // TODO: Refactor for immutability
  swapLecturers(from: string, to: string) {
    console.log(from + " ", this.courseForm.controls[from].value);
    console.log(to + " ", this.courseForm.controls[to].value);
    let lecturersForSwap = this.courseForm.controls[from].value.map(result => {
      return result;
    });
    console.log("Single for swap: ", lecturersForSwap);

    for (let i = 0; i < lecturersForSwap.length; i++) {
      this.courseForm.controls[to].value.push(lecturersForSwap[i]);
      this[to].push(lecturersForSwap[i]);
      this.courseForm.controls[from].value.splice(
      this.courseForm.controls[from].value.indexOf(lecturersForSwap[i]), 1);
      this[from].splice(this[from].indexOf(lecturersForSwap[i]), 1);
    }
  }

  swapLecturersAll(from: string, to: string): void {
    // Get all lecturers from source list
    console.log(from + " ", this.courseForm.controls[from].value);
    console.log(to + " ", this.courseForm.controls[to].value);
    let lecturersForSwap = this[from].map(result => {
      return result;
    });

    /*
     * Iterate thorugh source and push to target list (control and HTML element)
     * Splice from source
     */
    for (let i = 0; i < lecturersForSwap.length; i++) {
      this[to].push(lecturersForSwap[i]);
      this.courseForm.controls[to].value.push(lecturersForSwap[i]);
      this.courseForm.controls[from].value.splice(
        this.courseForm.controls[from].value.indexOf(lecturersForSwap[i]), 1);
      this[from].splice(this[from].indexOf(lecturersForSwap[i]), 1);
    }
  }

  gotoList(): void {
    this.router.navigate(['/courses']);
  }

  createItem(): FormGroup {
    console.log(this.courseUnits);
    return this.formBuilder.group({
      number: new FormControl({value: this.courseUnits ? 
        this.courseUnits.controls[this.courseUnits.controls.length - 1]['controls'].number.value + 1 : 1, disabled: false}),
      name: '',
      description: ''
    });
  }

  save(): void {
    console.log("Course form: ", this.courseForm);
    console.log("Course value: ", this.courseForm.value);
    this.courseService.save(this.courseForm.value).subscribe(
      result => {
        console.log(result);
        this.gotoList();
      },
      error => console.error(error)
    );
  }

  remove(href): void {
    this.courseService.remove(href).subscribe(
      result => {
        this.gotoList();
      },
      error => console.error(error)
    );
  }

  addItem(): void {
    this.courseUnits = this.courseForm.get('courseUnits') as FormArray;
    this.courseUnits.push(this.createItem());
  }

  toggle(number: number): boolean {
    this.courseForm.controls.courseUnits['controls'].forEach(el => {
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
  deleteItem(number): void {
    let numbers, index;
    this.courseUnits = this.courseForm.get('courseUnits') as FormArray;

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
    numbers = this.courseUnits.controls.map(current => {
      return current['controls'].number.value;
    });
    for (let i = 1; i <= this.courseUnits.controls.length; i++) {
      this.courseUnits.controls[i - 1]['controls'].number.setValue(i);
    }
    

  }
}
