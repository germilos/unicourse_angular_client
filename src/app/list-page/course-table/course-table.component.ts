import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/course';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css']
})
export class CourseTableComponent implements OnInit {

  @Input() currentCourses: Course[];

  constructor() { 
    this.currentCourses = [];
  }

  ngOnInit() {
  }

}
