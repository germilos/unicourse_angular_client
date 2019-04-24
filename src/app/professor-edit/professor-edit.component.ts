import { Component, OnInit } from '@angular/core';
import { Professor } from '../professor';
import { DepartmentService } from '../shared/department/department.service';
import { Department } from '../department';
import { LecturerService } from '../shared/lecturer/lecturer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-professor-edit',
  templateUrl: './professor-edit.component.html',
  styleUrls: ['./professor-edit.component.css']
})
export class ProfessorEditComponent implements OnInit {

  private model: Professor;
  private departments: Department[];

  constructor(private departmentService: DepartmentService,
              private lecturerService: LecturerService,
              private route: ActivatedRoute,
              private router: Router) { 
    this.model = new Professor('', '', '', 0, 'P', new Department(0, ''), 0);
  }

  // TODO: Refactor to avoid nesting subscriptions -> FlatMap
  ngOnInit() {
    this.departmentService.getAll().subscribe(response => {
      this.departments = response;
      this.route.params.subscribe(params => {
        const id = params['id'];
        if (id) {
          this.lecturerService.get(id).subscribe((professor: Professor) => {
            this.model = professor;
            console.log("Model: ", this.model);
            this.model.department = this.findProfessorDepartment(
                                      this.model.department);
          });
        }
      });
    });
  }

  save(form): void {
    console.log("Form value: ", form.value);
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
  findProfessorDepartment(department: Department): Department {
    for (let i = 0; i < this.departments.length; i++) {
      if (department.id === this.departments[i].id) {
        return this.departments[i];
      }
    }
  }
}
