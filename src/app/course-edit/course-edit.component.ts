import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../shared/course/course.service';
import { StudyProgramService } from '../shared/study-program/study-program.service';
import { DepartmentService } from '../shared/department/department.service';
import { NgForm, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

  course: any = {};
  studyPrograms: Array<any>;
  departments: Array<any>;
  courseForm: FormGroup;
  courseUnits: FormArray;
  sub: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private studyProgramService: StudyProgramService,
    private departmentService: DepartmentService) {
  }

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      name: '',
      espb: '',
      goal: '',
      status: '',
      department: '',
      studyProgram: '',
      courseUnits: this.formBuilder.array([this.createItem()])
    });
    this.studyProgramService.getAll().subscribe((studyPrograms) => {
      if (studyPrograms) {
        this.studyPrograms = studyPrograms;
      } else {
        console.log(`There was an error loading study programmes, returning to course list`);
        this.gotoList();
      }
    });
    this.departmentService.getAll().subscribe((departments) => {
      if (departments) {
        this.departments = departments;
      } else {
        console.log(`There was an error loading departments, returning to course list`);
        this.gotoList();
      }
    });
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        // if "id" exists, retrieve course from DB and assign to course variable
        this.courseService.get(id).subscribe((course: any) => {
          if (course) {
            this.course = course;
            // this.course.href = course._links.self.href; HATEOAS
          } else {
            console.log(`Course with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  gotoList() {
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

  // Template form 
  // save(form: NgForm) {
  //   this.courseService.save(form).subscribe(result => {
  //     this.gotoList();
  //   }, error => console.error(error));
  // }

  save() {
    console.log(this.courseForm.value);
    this.courseService.save(this.courseForm.value).subscribe(result => {
      console.log(result);
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.courseService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  addItem(): void {
    this.courseUnits = this.courseForm.get('courseUnits') as FormArray;
    this.courseUnits.push(this.createItem());
  }

  deleteItem(number): void {
    let numbers, index;
    // this.courseUnits = this.courseForm.get('courseUnits') as FormArray;
    console.log("-----" + this.courseUnits.controls)
    // numbers = this.courseUnits.value.map(current => {
    numbers = this.courseUnits.controls.map(current => {
      return current['controls'].number.value;
    })
    // })
    console.log("BROJEVI PRE", numbers);
    index = numbers.indexOf(number + 1);
    if (index !== -1) {
      console.log("INDEX: " + index);
      this.courseUnits.removeAt(index);
    }
    console.log("COURSE UNITS: ", this.courseUnits);
    // numbers = this.courseUnits.value.map(current => {
    //   return current.number;
    // })
    numbers = this.courseUnits.controls.map(current => {
      return current['controls'].number.value;
    })
    console.log("BROJEVI POSLE: " + numbers);
    // console.log("DUZINA: " + this.courseUnits.controls.length)
    for (let i = 1; i <= this.courseUnits.controls.length; i++) {
      // console.log("Unit: ", this.courseUnits.controls[i-1]);
      this.courseUnits.controls[i-1]['controls'].number.setValue(i);
      // this.courseUnits.controls[i-1].value.number = i;
      // console.log("Unit after: ", this.courseUnits.controls[i-1]);
    }
    console.log("-----+++", this.courseUnits);
    console.log(this.courseForm.value);
  }
}
