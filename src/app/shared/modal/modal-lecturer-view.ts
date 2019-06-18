import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {DepartmentService} from '../department/department.service';
import {Department} from '../../department';
import {Lecturer} from '../../lecturer';

@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: './modal-lecturer-view.html'
})
export class NgbdModalBasic implements OnInit {
  closeResult: string;
  @Input() private lecturers;
  @Output() private lecturersToSwap: EventEmitter<Lecturer[]> = new EventEmitter<Lecturer[]>();
  private departments: Department[] = [];
  private lecturersByDepartment: any[] = [];

  constructor(private modalService: NgbModal,
              private departmentService: DepartmentService) {
  }

  ngOnInit() {
    this.departmentService.getAll().subscribe(data => {
      this.departments = data;
      this.departments.forEach((department => {
        let lecturersWithDepartment = {
          department: department,
          lecturers: [],
          visible: false
        };
        this.lecturers.forEach((lecturer => {
          if (lecturer.department.id === department.id) {
            let lectCheckbox = {
              lecturer,
              selected: false
            }
            lecturersWithDepartment.lecturers.push(lectCheckbox);
          }
        }));
        this.lecturersByDepartment.push(lecturersWithDepartment);
        console.log('Lects by dept: ', this.lecturersByDepartment);
      }));
    });
  }

  switchVisible(index: number) {
    this.lecturersByDepartment[index].visible = this.lecturersByDepartment[index].visible ? false : true;
    console.log('Switch visible: ', this.lecturersByDepartment);
  }

  selectAll(index: number) {
    this.lecturersByDepartment[index].lecturers.forEach((lecturer => {
      lecturer.selected = lecturer.selected ? false : true;
    }));
    console.log('All select: ', this.lecturersByDepartment);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      const lecturersTS: Lecturer[] = [];
      console.log('After close: ', this.lecturersByDepartment);
      this.lecturersByDepartment.forEach(lectbydept => {
        lectbydept.lecturers.forEach(lectwithdept => {
          if (lectwithdept.selected) {
            lecturersTS.push(lectwithdept.lecturer);
          }
        });
      });
      this.lecturersToSwap.emit(lecturersTS);
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
