import { Component, OnInit, APP_INITIALIZER } from '@angular/core';
import { CourseService } from '../shared/course/course.service';
import { DepartmentService } from '../shared/department/department.service';
import { angularMath } from 'angular-ts-math';
import { Department } from '../department';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
/*
 * Refactor code for Typescript
 */
export class CourseListComponent implements OnInit {
  private currentCourses$: Array<any>;
  private pageSizeArray: Array<any>;
  private searchString: string;
  private pageSize;
  private departments: Array<any>;

  constructor(private courseService: CourseService,
              private departmentService: DepartmentService) {
    this.pageSize = 5;
    this.departments = [];   
    this.searchString = '';           
  }

  ngOnInit() {
    this.courseService.getPaginated(0, this.pageSize).subscribe(data => {
      this.currentCourses$ = data.content;
      console.log("Current: ", this.currentCourses$);
      this.setNumberOfPages(data['totalElements']);
    });

    // Get all departments for filtering
    this.departmentService.getAll().subscribe((data: Department[]) => {
      this.departments = data;
    })
  }

  // Set number of pages to display
  setNumberOfPages(totalElements: number): void {
    this.pageSizeArray = new Array(angularMath.nextIntegerOfNumber(
      totalElements/this.pageSize));
  }

  getPage(page: number) {
    this.courseService.getPaginated(page, this.pageSize).subscribe(data => {
      this.currentCourses$ = data.content;
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
