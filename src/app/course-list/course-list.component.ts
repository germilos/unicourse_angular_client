import { Component, OnInit } from '@angular/core';
import { CourseService } from '../shared/course/course.service';
import { angularMath } from 'angular-ts-math';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
/*
* Refactor code for Typescript
*/
export class CourseListComponent implements OnInit {
  currentCourses: Array<any>;
  helperArray: Array<any>;
  private pageSize = 10;

  constructor(private courseService: CourseService) { }

  async ngOnInit() {
    this.courseService.getPaginated().subscribe(data => {
      console.log(data);
      this.currentCourses = data.content;
    });
    this.helperArray = new Array(angularMath.nextIntegerOfNumber(await this.getCount() / this.pageSize));
  }

  getPage(page: number) {
    this.courseService.getPaginated(page, this.pageSize).subscribe(data => {
      console.log(data.content);
      this.currentCourses = data.content;
    });
    
  }

  async getCount(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.courseService.getCount().subscribe(success => {
        resolve(success);
      });
    });
  }
}
