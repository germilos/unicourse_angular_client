import { Component, OnInit } from '@angular/core';
import { LecturerService } from '../shared/lecturer/lecturer.service';
import { DepartmentService } from '../shared/department/department.service';
import { Lecturer } from '../lecturer';
import { Department } from '../department';
import { angularMath } from 'angular-ts-math';

@Component({
  selector: 'app-lecturer-list',
  templateUrl: './lecturer-list.component.html',
  styleUrls: ['./lecturer-list.component.css']
})
export class LecturerListComponent implements OnInit {

  private currentLecturers$: Array<Lecturer>;
  private pageSizeArray: Array<any>;
  private searchString: string;
  private pageSize: number;
  private departments: Array<Department>;

  constructor(private lecturerService: LecturerService,
              private departmentService: DepartmentService) {
    this.pageSize = 5;
    this.departments = [];
  }

  ngOnInit() {
    this.initialize();
  }

  initialize(): void {
    this.getPage(0);

    // Get all departments for filtering
    this.departmentService.getAll().subscribe((data: Department[]) => {
      this.departments = data;
    })
  }

  // Set number of pages to display
  setNumberOfPages(totalElements: number): void {
    this.pageSizeArray = new Array(angularMath.nextIntegerOfNumber(
      totalElements / this.pageSize))
  }

  /*
  ** Get <this.pageSize> lecturers with <page>*10 offset and populate
  ** <currentLecturers>
  */
  getPage(page: number) {
    if ((!this.searchString || this.searchString === '') 
          && this.selectedDepartments.length == 0) {
      console.log("Nothing");
      this.lecturerService.getAllPaginated(page, this.pageSize).subscribe(
        (data: Lecturer[]) => {
        this.currentLecturers$ = data['content'];
        this.setNumberOfPages(data['totalElements']);
      });
    } else if (this.selectedDepartments.length > 0 &&
      (!this.searchString || this.searchString === '')) {
      console.log("Dept");
      this.lecturerService.getAllByDepartmentsPaginated(this.selectedDepartments,
        page, this.pageSize).subscribe((data: Lecturer[]) => {
          this.currentLecturers$ = data['content'];
          this.setNumberOfPages(data['totalElements']);
        });
    } else if ((this.searchString && this.searchString.length > 0) && 
      this.selectedDepartments.length === 0) {
        console.log("Name");
         this.lecturerService.getAllByNamePaginated(this.searchString, page,
          this.pageSize).subscribe((data: Lecturer[]) => {
            this.currentLecturers$ = data['content'];
            this.setNumberOfPages(data['totalElements']);
          });
    } else {
      console.log("Name and dept.");
      this.lecturerService.getAllByNameAndDepartmentsPaginated(this.searchString,
         this.selectedDepartments, page, this.pageSize).subscribe((data: Lecturer[]) => {
          this.currentLecturers$ = data['content'];
          this.setNumberOfPages(data['totalElements']);
        });
    }
  }

  getByName() {
    this.lecturerService.getAllByNamePaginated(this.searchString, 0,
       this.pageSize).subscribe((data: Lecturer[]) => {
        this.currentLecturers$ = data['content'];
        this.setNumberOfPages(data['totalElements']);
      });
  }

  // Return all active filter departments
  get selectedDepartments(): number[] {
    let selectedDepartments: number[] = [];
    return this.departments.reduce((departments, type) => {
      if (type.selected) {
        selectedDepartments.push(type.id);
      }
      return selectedDepartments;
    }, [])
  }
}
