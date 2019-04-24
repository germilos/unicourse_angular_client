import { Component, OnInit, APP_INITIALIZER } from '@angular/core';
import { DepartmentService } from '../shared/department/department.service';
import { angularMath } from 'angular-ts-math';
import { Department } from '../department';
import { CourseService } from '../shared/course/course.service';

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
    this.courseService.getAllPaginated(0, this.pageSize).subscribe(data => {
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
    this.courseService.getAllPaginated(page, this.pageSize).subscribe(data => {
      this.currentCourses$ = data.content;
    });
    if ((!this.searchString || this.searchString === '') 
          && this.selectedDepartments.length == 0) {
      console.log("Nothing");
      this.courseService.getAllPaginated(page, this.pageSize).subscribe(
        (data: any[]) => {
        this.currentCourses$ = data['content'];
        this.setNumberOfPages(data['totalElements']);
      });
    } else if (this.selectedDepartments.length > 0 &&
      (!this.searchString || this.searchString === '')) {
      console.log("Dept");
      this.courseService.getAllByDepartmentsPaginated(this.selectedDepartments,
        page, this.pageSize).subscribe((data: any[]) => {
          this.currentCourses$ = data['content'];
          this.setNumberOfPages(data['totalElements']);
        });
    } else if ((this.searchString && this.searchString.length > 0) && 
      this.selectedDepartments.length === 0) {
        console.log("Name");
         this.courseService.getAllByNamePaginated(this.searchString, page,
          this.pageSize).subscribe((data: any[]) => {
            this.currentCourses$ = data['content'];
            this.setNumberOfPages(data['totalElements']);
          });
    } else {
      console.log("Name and dept.");
      this.courseService.getAllByNameAndDepartmentsPaginated(this.searchString,
         this.selectedDepartments, page, this.pageSize).subscribe((data: any[]) => {
          this.currentCourses$ = data['content'];
          this.setNumberOfPages(data['totalElements']);
        });
    }
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
