import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  public API = '//localhost:8080/api';
  public COURSE_API = this.API + '/courses';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get('//localhost:8080/api/courses');
  }

  get(id: string) {
    return this.http.get(this.COURSE_API + '/' + id);
  }

  save(course: any): Observable<any> {
    let result: Observable<Object>;
    console.log(course);
    if (course['id']) {
      result = this.http.put(this.COURSE_API, course);
    } else {
      result = this.http.post(this.COURSE_API, course);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
