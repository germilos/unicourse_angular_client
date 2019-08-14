import {Component, OnInit, Input} from '@angular/core';
import {Course} from 'src/app/course';
import {CourseService} from '../../shared/course/course.service';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css']
})
export class CourseTableComponent implements OnInit {

  @Input() currentCourses: Course[];

  constructor(private courseService: CourseService) {
    this.currentCourses = [];
  }

  ngOnInit() {
  }

  deleteCourse(courseId: number) {
    const result = confirm('Are you sure you want to delete this course?');
    if (result) {
      this.courseService.remove(courseId).subscribe(res => {
        this.courseService.emit();
        alert('Successfully deleted course!');
      });
    }
  }

}
