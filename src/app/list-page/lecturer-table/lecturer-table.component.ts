import {Component, OnInit, Input} from '@angular/core';
import {Lecturer} from 'src/app/lecturer';
import {LecturerService} from '../../shared/lecturer/lecturer.service';

@Component({
  selector: 'app-lecturer-table',
  templateUrl: './lecturer-table.component.html',
  styleUrls: ['./lecturer-table.component.css']
})
export class LecturerTableComponent implements OnInit {

  @Input() currentLecturers: Lecturer[];

  constructor(private lecturerService: LecturerService) {
    this.currentLecturers = [];
  }

  ngOnInit() {
  }

  deleteLecturer(lecturerId: number) {
    const result = confirm('Are you sure you want to delete this lecturer?');
    if (result) {
      this.lecturerService.remove(lecturerId).subscribe(res => {
        this.lecturerService.emit();
        alert('Successfully deleted lecturer!');
      });
    }
  }
}
