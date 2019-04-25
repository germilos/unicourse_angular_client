import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css']
})
export class CourseTableComponent implements OnInit {

  @Input() currentCourses: any[];

  constructor() { 
    this.currentCourses = [];
  }

  ngOnInit() {
  }

}
