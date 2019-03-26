import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'courseDepatmentFilter'
})
export class CourseDepatmentFilterPipe implements PipeTransform {

  transform(courses: any[], departmentNames: string[]): any[] {
    if (!departmentNames || departmentNames.length === 0) return courses;
    return courses.filter(course => departmentNames.includes(course.department.name));
  }
  

}
