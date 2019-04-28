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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private studyProgramService: StudyProgramService,
    private lecturerService: LecturerService,
    private departmentService: DepartmentService
  ) { }

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      id: '',
      name: '',
      espb: '',
      goal: '',
      status: '',
      department: '',
      studyProgram: ''
    });

    this.requestDataFromMultipleSources().subscribe(responseList => {
      this.selectLecturers = responseList[0];
      this.departments = responseList[1];
      this.studyPrograms = responseList[2];
      this.route.params.subscribe(params => {
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
            } else {
              console.log(`Course with id '${id}' not found, returning to list`);
              this.gotoList();
            }
          });
        }
      });
    })
  }

  addFormArray(name: string, formGroup: FormGroup) {
    if (this.courseForm.controls['courseUnits']) {
      console.log("Form group in course edit: ", formGroup.controls)
      this.courseForm.controls.courseUnits.setValue(formGroup.controls.courseUnits.value);
      console.log("Course form: ", this.courseForm.value);
    } else {
      this.courseForm.addControl(name, formGroup.controls.courseUnits);
    }
    console.log("In course edit: ", this.courseForm.controls.courseUnits);
  }

  addFormGroup(name: string, formGroup: FormGroup) {
    this.courseForm.addControl(name, formGroup.controls.lecturers);
  }

  private requestDataFromMultipleSources(): Observable<any[]> {
    let lecturers = this.lecturerService.getAll();
    let departments = this.departmentService.getAll();
    let studyPrograms = this.studyProgramService.getAll();

    return forkJoin([lecturers, departments, studyPrograms]);
  }

  populateCourseUnits() {
    let control = <FormArray>this.courseForm.get('courseUnits');
    control.removeAt(0);

    this.course.courseUnits.forEach(x => {
      control.push(this.formBuilder.group({
        number: new FormControl({ value: x.number, disabled: false }),
        name: x.name,
        description: x.description
      }))
    })
    return control;
  }

  gotoList(): void {
    this.router.navigate(['/courses']);
  }

  save(): void {
    this.courseService.save(this.courseForm.value).subscribe(
      result => {
        console.log(result);
        this.gotoList();
      },
      error => console.error(error)
    );
  }
}
