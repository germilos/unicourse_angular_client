import { Pipe, PipeTransform } from '@angular/core';
import { Lecturer } from './lecturer';

@Pipe({
  name: 'lecturerDepartmentFilter'
})
export class LecturerDepartmentFilterPipe implements PipeTransform {

  transform(lecturers: Lecturer[], departmentNames: string[]): any[] {
    if (!departmentNames || departmentNames.length === 0) return lecturers;
    return lecturers.filter(lecturer => departmentNames.includes(lecturer.department.name));
  }
}
