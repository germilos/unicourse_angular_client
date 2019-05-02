import { Component, OnInit } from '@angular/core';
import { Lecturer } from '../lecturer';
import { Department } from '../department';
import { DepartmentService } from '../shared/department/department.service';
import { LecturerService } from '../shared/lecturer/lecturer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Assistant } from '../assistant';
import { Professor } from '../professor';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-lecturer-edit',
  templateUrl: './lecturer-edit.component.html',
  styleUrls: ['./lecturer-edit.component.css']
})
export class LecturerEditComponent implements OnInit {

  private model: Lecturer;
  private departments: Department[];
  private lecturerType: string;

  constructor(private departmentService: DepartmentService,
    private lecturerService: LecturerService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.lecturerType = this.router.url.includes('professor') ? 'professor' : 'assistant';
    this.initializeNewModel();
    this.departmentService.getAll().subscribe((response: Department[]) => {
      this.departments = response;
      this.checkForPassedLecturer();
    });
  }

  checkForPassedLecturer(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.lecturerService.get(id).subscribe((lecturer: Lecturer) => {
          this.model = lecturer;
          this.model.department = this.findLecturerDepartment(
            this.model.department);
        });
      }
    });
  }

  save(form: NgForm): void {
    console.log("Fprm: ", form.value);
    this.lecturerService.save(form.value).subscribe(
      result => {
        this.gotoList();
      },
      error => console.log(error)
    );
  }

  gotoList(): void {
    this.router.navigate(['/lecturers']);
  }

  /*
  ** Retrieve department from 'departments' which matches model's department
  ** so they point to the same object (setting default select option)
  */
  findLecturerDepartment(department: Department): Department {
    for (let i = 0; i < this.departments.length; i++) {
      if (department.id === this.departments[i].id) {
        return this.departments[i];
      }
    }
  }

  // Check URL path to initialize adequate model
  initializeNewModel(): void {
    if (this.lecturerType === 'assistant') {
      this.model = new Assistant('', '', 'A', '', new Department(0, ''));
    } else {
      this.model = new Professor('', '', '', 0, 'P', new Department(0, ''), 0);
    }
  }
}
