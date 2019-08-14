import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import 'rxjs/Rx';
import {Course} from 'src/app/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  public API = '//localhost:8080/api';
  public COURSE_API = this.API + '/courses';

  private emitChangeSource = new Subject<void>();
  changeEmitted$ = this.emitChangeSource.asObservable();

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get('//localhost:8080/api/courses');
  }

  get(id: string): Observable<any> {
    return this.http.get(this.COURSE_API + '/' + id)
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  getAllPaginated(pageNumber: number = 0, pageSize: number = 10): Observable<any> {
    const params = {
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      orderBy: 'id',
      direction: 'ASC'
    };
    return this.http.get('//localhost:8080/api/courses/get?', {params});
  }

  getAllByNamePaginated(name: string, pageNumber: number = 0,
                        pageSize: number = 5): Observable<any[]> {
    const params = {
      name,
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      orderBy: 'id',
      direction: 'ASC'
    };
    return this.http.get<any[]>(this.COURSE_API + '/get?', {params});
  }

  getAllByDepartmentsPaginated(departmentIds: number[], pageNumber: number = 0,
                               pageSize: number = 1): Observable<any[]> {
    const departmentStrings: string[] = departmentIds.map((departmentId: number) => {
      return departmentId.toString();
    });
    const params = {
      departmentId: departmentStrings,
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      orderBy: 'id',
      direction: 'ASC'
    };

    return this.http.get<any[]>(this.COURSE_API + '/get?', {params});
  }

  getAllByNameAndDepartmentsPaginated(name: string, departmentIds: number[],
                                      pageNumber: number = 0, pageSize: number = 1) {
    const departmentStrings: string[] = departmentIds.map((departmentId: number) => {
      return departmentId.toString();
    });
    const params = {
      name,
      departmentId: departmentStrings,
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      orderBy: 'id',
      direction: 'ASC'
    };
    return this.http.get<any[]>(this.COURSE_API + '/get?', {params});
  }

  getCount(): Observable<number> {
    return this.http.get<number>('//localhost:8080/api/courses/count');
  }

  save(course: any): Observable<any> {
    let result: Observable<Object>;
    console.log('Course to save: ', course);
    // Remove 'selectLecturers' attribute - only used for list swap
    delete course.selectLecturers;
    const courseToSave: Course = course;
    console.log(courseToSave);
    if (course['id']) {
      result = this.http.put(this.COURSE_API, courseToSave);
    } else {
      result = this.http.post(this.COURSE_API, courseToSave);
    }
    return result;
  }

  remove(courseId: number) {
    return this.http.delete(this.COURSE_API + '?courseId=' + courseId);
  }

  emit(): void {
    this.emitChangeSource.next();
  }
}
