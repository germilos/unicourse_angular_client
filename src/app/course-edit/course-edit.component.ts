import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../shared/course/course.service';
import { StudyProgramService } from '../shared/study-program/study-program.service';
import { DepartmentService } from '../shared/department/department.service';
import { LecturerService } from '../shared/lecturer/lecturer.service';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  course: any = {};
  studyPrograms: Array<any>;
  departments: Array<any>;
  selectLecturers: Array<any> = [];
  lecturers: Array<any> = [];
  courseForm: FormGroup;
  courseUnits: FormArray;
  sub: Subscription;

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
      console.log("RESP LIST: ", responseList);
      this.selectLecturers = responseList[0];
      console.log("LECTURERSS: ", this.lecturers);
      this.departments = responseList[1];
      this.studyPrograms = responseList[2];
      this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        // if "id" exists, retrieve course from DB and assign to course variable
        this.courseService.get(id).subscribe((course: any) => {
          if (course) {
            this.course = course;
            console.log("COURSE FORM: ", this.courseForm);
            console.log("COURSE: ", this.course);
            console.log("SELECT LECTS: ", this.selectLecturers);
            this.courseForm.patchValue({
              name: this.course.name,
              espb: this.course.espb,
              goal: this.course.goal,
              status: this.course.status,
              department: this.departments.filter(d => d.id === this.course.department.id)[0],
              studyProgram: this.studyPrograms.filter(sp => sp.id === this.course.studyProgram.id)[0]
            })
            this.populateCourseUnits();
            let controlLects = <FormControl> this.courseForm.controls.lecturers;
            let controlSelLects = <FormControl> this.courseForm.controls.selectLecturers;
            // for (let i = 0; i < this.selectLecturers.length; i++) {
            //   for (let j = 0; j < this.course.lecturers.length; j++) {
            //     if (this.selectLecturers[i].id === this.course.lecturers[j].id)
            //       controlLects.value.push(this.selectLecturers[i]);
            //     else 
            //       controlSelLects.value.push(this.selectLecturers[i]);
            //   }
            // }
            console.log("Course lecturers: ", this.course.lecturers);
            console.log("Select lecuters: ", this.selectLecturers);
            for (let i = 0; i < this.course.lecturers.length; i++) {
                controlLects.value.push(this.course.lecturers[i]);
                this.lecturers.push(this.course.lecturers[i]);
                console.log("Index: ", this.selectLecturers.indexOf(this.course.lecturers[i]))
                // let pos = this.selectLecturers.map(function(e) { 
                //   return e.id; 
                // }).indexOf(this.course.lecturers[i].id);
                // console.log("Index map: " + pos);
                this.selectLecturers.splice(this.selectLecturers.map(function(e) { 
                  return e.id; 
                }).indexOf(this.course.lecturers[i].id), 1);
            }
            console.log("HERE ", this.courseForm);
          } else {
            console.log(`Course with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
    }) 

    console.log("LECTURERSS: OUT ", this.lecturers);
    

    // this.studyProgramService.getAll().subscribe(studyPrograms => {
    //   if (studyPrograms) {
    //     this.studyPrograms = studyPrograms;
    //   } else {
    //     console.log(
    //       `There was an error loading study programmes, returning to course list`
    //     );
    //     this.gotoList();
    //   }
    // });
    // this.departmentService.getAll().subscribe(departments => {
    //   if (departments) {
    //     this.departments = departments;
        
    //   } else {
    //     console.log(
    //       `There was an error loading departments, returning to course list`
    //     );
    //     this.gotoList();
    //   }
    // });
    // this.lecturerService.getAll().subscribe(lecturers => {
    //   if (lecturers) {
    //     console.log('Lecturers from service: ', lecturers);
    //     this.selectLecturers = lecturers;
    //     console.log('Lecturers in service: ', this['selectLecturers']);
    //   } else {
    //     console.log(
    //       `There was an error loading lecturers, returning to course list`
    //     );
    //     this.gotoList();
    //   }
    // });
    
    // this.sub = this.route.params.subscribe(params => {
    //   const id = params['id'];
    //   if (id) {
    //     // if "id" exists, retrieve course from DB and assign to course variable
    //     this.courseService.get(id).subscribe((course: any) => {
    //       if (course) {
    //         this.course = course;
    //         console.log("COURSE FORM: ", this.courseForm);
    //         console.log("COURSE: ", this.course);
    //         console.log("SELECT LECTS: ", this.selectLecturers);
    //         this.courseForm.patchValue({
    //           name: this.course.name,
    //           espb: this.course.espb,
    //           goal: this.course.goal,
    //           status: this.course.status,
    //           department: this.departments.filter(d => d.id === this.course.department.id)[0],
    //           studyProgram: this.studyPrograms.filter(sp => sp.id === this.course.studyProgram.id)[0]
    //         })
    //         this.populateCourseUnits();
    //         let controlLects = <FormControl> this.courseForm.controls.lecturers;
    //         let controlSelLects = <FormControl> this.courseForm.controls.selectLecturers;
    //         // for (let i = 0; i < this.selectLecturers.length; i++) {
    //         //   for (let j = 0; j < this.course.lecturers.length; j++) {
    //         //     if (this.selectLecturers[i].id === this.course.lecturers[j].id)
    //         //       controlLects.value.push(this.selectLecturers[i]);
    //         //     else 
    //         //       controlSelLects.value.push(this.selectLecturers[i]);
    //         //   }
    //         // }
    //         for (let i = 0; i < this.course.lecturers.length; i++) {
    //             controlLects.value.push(this.course.lecturers[i]);
    //             this.lecturers.push(this.course.lecturers[i]);
    //             // this.selectLecturers.splice(this.selectLecturers.indexOf(this.course.lecturers[i]), 1);
    //         }
    //         console.log("HERE ", this.courseForm);
    //       } else {
    //         console.log(`Course with id '${id}' not found, returning to list`);
    //         this.gotoList();
    //       }
    //     });
    //   }
    // });
  }

  
  private requestDataFromMultipleSources(): Observable<any[]> {
    let lecturers = this.lecturerService.getAll();
    let departments = this.departmentService.getAll();
    let studyPrograms = this.studyProgramService.getAll();
    console.log("HEY", lecturers);
    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    return forkJoin([lecturers, departments, studyPrograms]);
  }

  populateCourseUnits() {
    let control = <FormArray>this.courseForm.controls.courseUnits;
    control.removeAt(0);
    this.course.courseUnits.forEach(x => {
      control.push(this.formBuilder.group({
        number: x.number,
        name: x.name,
        description: x.description
      }))
    })
    return control;
  }

  swapLecturers(from: string, to: string) {
    // TODO: Refactor for immutability
    let lecturersForSwap = this.courseForm.controls[from].value.map(result => {
      return result;
    });

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
      this[from].splice(this[from].indexOf(lecturersForSwap[i]), 1);
    }
  }

  gotoList(): void {
    this.router.navigate(['/courses']);
  }

  createItem(): FormGroup {
    console.log(this.courseUnits);
    return this.formBuilder.group({
      number: this.courseUnits ? this.courseUnits.controls[this.courseUnits.controls.length - 1]['controls'].number.value + 1 : 1,
      name: '',
      description: ''
    });
  }

  save(): void {
    console.log(this.courseForm.value);
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

  deleteItem(number): void {
    let numbers, index;

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
