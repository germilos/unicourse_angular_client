import {Component, OnInit} from '@angular/core';
import {Department} from '../department';
import {LecturerService} from '../shared/lecturer/lecturer.service';
import {DepartmentService} from '../shared/department/department.service';
import {Lecturer} from '../lecturer';
import {angularMath} from 'angular-ts-math';
import {CourseService} from '../shared/course/course.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  private currentEntities$: any[];
  private routePath: string;
  private activeEntityService: any;
  private pageSizeArray: any[];
  private searchString: string;
  private pageSize: number;
  private departments: Department[];
  currentPage: number;

  constructor(private router: Router,
              private lecturerService: LecturerService,
              private departmentService: DepartmentService,
              private courseService: CourseService) {
  }

  ngOnInit() {
    this.initialize();
  }

  initialize(): void {

    this.pageSize = 10;
    this.departments = [];
    this.pageSizeArray = new Array();

    this.routePath = this.router.url.slice(1);
    if (this.routePath === 'lecturers') {
      this.activeEntityService = this.lecturerService;
    } else if (this.routePath === 'courses') {
      this.activeEntityService = this.courseService;
    }

    this.getPage(0);
    // Get all departments for filtering
    this.departmentService.getAll().subscribe((data: Department[]) => {
      this.departments = data;
    });
  }

  // Return all active filter departments
  get selectedDepartments(): number[] {
    const selectedDepartments: number[] = [];
    return this.departments.reduce((departments, department) => {
      if (department.selected) {
        selectedDepartments.push(department.id);
      }
      return selectedDepartments;
    }, []);
  }

  onSearchChange(inputString: string) {
    this.searchString = inputString;
    this.getPage(0);
  }

  // Set number of pages to display
  setNumberOfPages(totalElements: number): void {
    this.pageSizeArray = new Array(angularMath.nextIntegerOfNumber(
      totalElements / this.pageSize));
  }

  /*
  ** Get <this.pageSize> lecturers with <page>*10 offset and populate
  ** <currentLecturers>
  */
  getPage(page: number) {
    console.log('Getting: ', page);
    console.log('Page size array: ', this.pageSizeArray.length);
    if (page >= 0 && (page === this.pageSizeArray.length || page < this.pageSizeArray.length - 1)) {
      this.currentPage = page;

      if ((!this.searchString || this.searchString === '')
        && this.selectedDepartments.length === 0) {
        this.activeEntityService.getAllPaginated(page, this.pageSize).subscribe(
          (data: Lecturer[]) => {
            this.currentEntities$ = data['content'];
            this.setNumberOfPages(data['totalElements']);
          });
      } else if (this.selectedDepartments.length > 0 &&
        (!this.searchString || this.searchString === '')) {
        this.activeEntityService.getAllByDepartmentsPaginated(this.selectedDepartments,
          page, this.pageSize).subscribe((data: Lecturer[]) => {
          this.currentEntities$ = data['content'];
          this.setNumberOfPages(data['totalElements']);
        });
      } else if ((this.searchString && this.searchString.length > 0) &&
        this.selectedDepartments.length === 0) {
        this.activeEntityService.getAllByNamePaginated(this.searchString, page,
          this.pageSize).subscribe((data: Lecturer[]) => {
          this.currentEntities$ = data['content'];
          this.setNumberOfPages(data['totalElements']);
        });
      } else {
        this.activeEntityService.getAllByNameAndDepartmentsPaginated(this.searchString,
          this.selectedDepartments, page, this.pageSize).subscribe((data: Lecturer[]) => {
          this.currentEntities$ = data['content'];
          this.setNumberOfPages(data['totalElements']);
        });
      }
    }
  }
}
