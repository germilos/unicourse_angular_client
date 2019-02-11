import { Component, OnInit } from '@angular/core';
import { CourseService } from '../shared/course/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Array<any>;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getAll().subscribe(data => {
      this.courses = data;
    });
  }

}
