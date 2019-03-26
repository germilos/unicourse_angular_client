import { Component, OnInit, APP_INITIALIZER } from '@angular/core';
import { CourseService } from '../shared/course/course.service';
import { DepartmentService } from '../shared/department/department.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { angularMath } from 'angular-ts-math';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
/*
 * Refactor code for Typescript
 */
export class CourseListComponent implements OnInit {
  currentCourses: Array<any>;
  helperArray: Array<any>;
  searchString: string;
  // departments: Array<any> = [
  //   { name: 'AI', selected: false },
  //   { name: 'Software Engineering', selected: false }
  // ];
  departments: Array<any>;
  courseStatuses: Array<any> = ['Mandatory', 'Optional'];
  private pageSize = 3;

  constructor(private courseService: CourseService,
              private departmentService: DepartmentService) {}

  /* 
  ** Do not use 'async' keyword - find alternative solution using Observable/Promise
  */
  async ngOnInit() {
    this.intialize();
    this.courseService.getPaginated().subscribe(data => {
      console.log(data);
      this.currentCourses = data.content;
    });
    this.helperArray = new Array(
      angularMath.nextIntegerOfNumber((await this.getCount()) / this.pageSize)
    );
    console.log(this.departments);
    this.departmentService.getAll().subscribe(response => {
      console.log("Response: ", response);
      this.departments = response;
    });
  }

  async intialize() {
    let resPaginated = await this.courseService.getPaginated().toPromise();
    console.log("RES PAG", resPaginated);
    let count = this.courseService.getCount().toPromise();
    console.log("COunt", count);
    let departments = this.departmentService.getAll().toPromise();
    this.currentCourses = resPaginated.content;
    this.helperArray = new Array(
      // angularMath.nextIntegerOfNumber(count / this.pageSize);
    )
  }
  getPage(page: number) {
    
    this.courseService.getPaginated(page, this.pageSize).subscribe(data => {
      console.log(data.content);
      this.currentCourses = data.content;
    });
  }

  async getCount(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.courseService.getCount().subscribe(success => {
        resolve(success);
      });
    });
  }

  get selectedDepartments() {
    return this.departments.reduce((departments, type) => {
      if (type.selected) {
        departments.push(type.name);
      }
      return departments;
    }, [])
  }
}
