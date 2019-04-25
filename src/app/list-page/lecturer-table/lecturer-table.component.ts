import { Component, OnInit, Input } from '@angular/core';
import { Lecturer } from 'src/app/lecturer';

@Component({
  selector: 'app-lecturer-table',
  templateUrl: './lecturer-table.component.html',
  styleUrls: ['./lecturer-table.component.css']
})
export class LecturerTableComponent implements OnInit {

  @Input() currentLecturers: Lecturer[];
  
  constructor() { 
    this.currentLecturers = [];
  }

  ngOnInit() {
  }

}
