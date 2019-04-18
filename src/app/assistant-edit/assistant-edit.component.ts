import { Component, OnInit } from '@angular/core';
import { LecturerService } from '../shared/lecturer/lecturer.service';
import { DepartmentService } from '../shared/department/department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Assistant } from '../assistant';
import { Department } from '../department';

@Component({
  selector: 'app-assistant-edit',
  templateUrl: './assistant-edit.component.html',
  styleUrls: ['./assistant-edit.component.css']
})
export class AssistantEditComponent implements OnInit {

  private model: Assistant;
  private departments: Department[];

  constructor(private departmentService: DepartmentService,
              private lecturerService: LecturerService,
              private route: ActivatedRoute,
              private router: Router) {
    this.model = new Assistant('', '', 'A', '', new Department(0, ''));
  }

  ngOnInit() {
    this.departmentService.getAll().subscribe(response => {
      this.departments = response;
      this.route.params.subscribe(params => {
        const id = params['id'];
        if (id) {
          this.lecturerService.get(id).subscribe((assistant: Assistant) => {
            this.model = assistant;
            this.model.department = this.findAssistantDepartment(
                                      this.model.department);
          });
        }
      });
    });
  }

  save(form): void {
    console.log(form.value);
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
 findAssistantDepartment(department: Department): Department {
    for (let i = 0; i < this.departments.length; i++) {
      if (department.id === this.departments[i].id) {
        return this.departments[i];
      }
    }
  }
}
