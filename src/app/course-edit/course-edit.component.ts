import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {CourseService} from '../shared/course/course.service';
import {StudyProgramService} from '../shared/study-program/study-program.service';
import {DepartmentService} from '../shared/department/department.service';
import {LecturerService} from '../shared/lecturer/lecturer.service';
import {FormBuilder, FormArray, FormGroup, FormControl, Validators} from '@angular/forms';
import {Observable, forkJoin} from 'rxjs';
import {StudyProgram} from '../study-program';
import {Department} from '../department';
import {Lecturer} from '../lecturer';
import {Course} from '../course';
import {CourseUnitsComponent} from './course-units/course-units.component';

/*
** Entire code to be refactored upon achieving complete functionality
*/
@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  private course: Course;
  private studyPrograms: StudyProgram[];
  private departments: Department[];
  // Lecturers not selected for POST/PUT
  private selectLecturers: Lecturer[] = [];
  private courseForm: FormGroup;

  @ViewChild(CourseUnitsComponent)
  private courseUnits: CourseUnitsComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private studyProgramService: StudyProgramService,
    private lecturerService: LecturerService,
    private departmentService: DepartmentService
  ) {
  }

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      'id': '',
      'name': new FormControl('', [Validators.required, Validators.maxLength(50),
        Validators.pattern('(?!^.*[A-Z]{2,}.*$)^[A-Z][a-z0-9 ]*$')]),
      'espb': new FormControl('', [Validators.required, Validators.max(6)]),
      'goal': new FormControl('', [Validators.required, Validators.maxLength(200),
        Validators.pattern('(?!^.*[A-Z]{2,}.*$)^[A-Z][a-z0-9 ]*$')]),
      'status': 'Mandatory',
      'department': {},
      'studyProgram': {}
    });

    this.requestDataFromMultipleSources().subscribe(responseList => {
      this.selectLecturers = responseList[0];
      this.departments = responseList[1];
      this.studyPrograms = responseList[2];

      this.courseForm.patchValue({
        'department': this.departments[0],
        'studyProgram': this.studyPrograms[0]
      });
      this.checkForPassedCourse();
    });
  }

  addItem(): void {
    this.courseUnits.addItem();
  }

  checkForPassedCourse(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      /*
      ** If 'id' parameter exists, retrieve course from database
      ** and assign to course variable
      */
      if (id) {
        this.courseService.get(id)
          .subscribe(
            (course: Course) => this.setRetrievedCourse(course),
            (error) => console.log(error)
          );
      }
    });
  }

  setRetrievedCourse(course: Course): void {
    this.course = course;
    console.log('Retreived course original: ', course);
    console.log('Retreived course now: ', this.course);
    this.courseForm.patchValue({
      id: this.course.id,
      name: this.course.name,
      espb: this.course.espb,
      goal: this.course.goal,
      status: this.course.status,
      department: this.departments.filter(d => d.id === this.course.department.id)[0],
      studyProgram: this.studyPrograms.filter(sp => sp.id === this.course.studyProgram.id)[0]
    });
    this.populateCourseUnits();
  }

  addFormArray(name: string, formGroup: FormGroup): void {
    if (this.courseForm.controls['courseUnits']) {
      this.courseForm.controls.courseUnits.setValue(formGroup.controls.courseUnits.value);
    } else {
      this.courseForm.addControl(name, formGroup.controls.courseUnits);
    }
  }

  addFormGroup(name: string, formGroup: FormGroup): void {
    this.courseForm.addControl(name, formGroup.controls.lecturers);
  }

  private requestDataFromMultipleSources(): Observable<any[]> {
    const lecturers = this.lecturerService.getAll();
    const departments = this.departmentService.getAll();
    const studyPrograms = this.studyProgramService.getAll();

    return forkJoin([lecturers, departments, studyPrograms]);
  }

  populateCourseUnits(): FormArray {
    const control = <FormArray>this.courseForm.get('courseUnits');
    if (this.course.courseUnits.length > 0) {
      control.removeAt(0);

      this.course.courseUnits.forEach(courseUnit => {
        control.push(this.formBuilder.group({
          number: new FormControl({value: courseUnit.number, disabled: false}),
          name: courseUnit.name,
          description: courseUnit.description
        }));
      });
    }
    return control;
  }

  save(): void {
    if (this.courseForm.controls['lecturers'] && this.courseForm.controls['lecturers'].value.length > 0) {
      this.courseService.save(this.courseForm.value).subscribe(
        result => {
          alert('Successfully saved course!');
          this.gotoList();
        },
        error => alert(error)
      );
    } else {
      alert('You must select at least one lecturer!');
    }
  }

  gotoList(): void {
    this.router.navigate(['/courses']);
  }
}
