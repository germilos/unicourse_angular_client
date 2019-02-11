import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../shared/course/course.service';
import { StudyProgramService } from '../shared/study-program/study-program.service';
import { DepartmentService } from '../shared/department/department.service';
import { LecturerService } from '../shared/lecturer/lecturer.service';
import { NgForm, FormBuilder, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

  course: any = {};
  studyPrograms: Array<any>;
  departments: Array<any>;
  lecturers: Array<any>;
  courseForm: FormGroup = this.formBuilder.group({
    name: '',
    espb: '',
    goal: '',
    status: '',
    department: '',
    studyProgram: '',
    selectLecturers: this.formBuilder.array([{}]),
    courseUnits: this.formBuilder.array([this.createItem()])
  });
  // courseUnits: FormArray;
  sub: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private studyProgramService: StudyProgramService,
    private lecturerService: LecturerService,
    private departmentService: DepartmentService) {
  }

  executeServices() {
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
    this.lecturerService.getAll().subscribe((lecturers) => {
      if (lecturers) {
        this.lecturers = lecturers;
        console.log("LLecturers in service: ", this.lecturers);
        this.populateSelectLecturers();

      } else {
        console.log(`There was an error loading lecturers, returning to course list`);
        this.gotoList();
      }
    });
  }

  ngOnInit() {
    this.executeServices();


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

  populateSelectLecturers() {
    let selectLecturers = this.courseForm.get('selectLecturers') as FormArray;
    selectLecturers.removeAt(0);
    console.log("LECTURERS", this.lecturers);
    for (let i = 0; i < this.lecturers.length; i++) {
      let newGroup = this.formBuilder.group({
        id: this.lecturers[i].id,
        type: this.lecturers[i].type,
        nameSurname: this.lecturers[i].nameSurname,
        studyField: this.lecturers[i].studyField,
        department: this.lecturers[i].department,
        position: this.lecturers[i].position ? this.lecturers[i].position : null,
        researchNumber: this.lecturers[i].researchNumber ? this.lecturers[i].researchNumber : null,
        diploma: this.lecturers[i].diploma ? this.lecturers[i].diploma : null
      })
      selectLecturers.push(newGroup);
    }
    console.log("Lecturers array: ", selectLecturers);
  }

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
    numbers = this.courseUnits.controls.map(current => {
      return current['controls'].number.value;
    })

    index = numbers.indexOf(number + 1);
    if (index !== -1) {
      this.courseUnits.removeAt(index);
    }

    for (let i = 1; i <= this.courseUnits.controls.length; i++) {
      this.courseUnits.controls[i - 1]['controls'].number.setValue(i);
    }
  }

  transfer(type): void {
    // Take elements from <type> select

    // Transfer them to <type-opposite> select

  }
}
