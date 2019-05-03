import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx'

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

  get(id: string): Observable<any> {
    return this.http.get(this.COURSE_API + '/' + id)
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  getAllPaginated(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get('//localhost:8080/api/courses/get?page=' 
    + page + '&size=' + size + '&orderBy=id&direction=ASC');
  }

  getAllByNamePaginated(name: string, pageNumber: number = 0,
     pageSize: number = 5): Observable<any[]> {
      return this.http.get<any[]>(this.COURSE_API + "/get?name=" + name +
      "&page=" + pageNumber + "&size=" + pageSize);
  }

  getAllByDepartmentsPaginated(departmentIds: number[], pageNumber: number = 0,
    pageSize: number = 1): Observable<any[]> {
    let departmentStrings: string[] = departmentIds.map((departmentId: number) => {
      return departmentId.toString();
    });
    let params = {
      departmentId: departmentStrings,
      page : pageNumber.toString(),
      pageSize: pageSize.toString(),
      orderBy: "id",
      direction: "ASC"
    };

    return this.http.get<any[]>(this.COURSE_API + '/get?', {params})        
  }

  getAllByNameAndDepartmentsPaginated(name: string, departmentIds: number[],
    pageNumber: number = 0, pageSize: number = 1) {
      let departmentStrings: string[] = departmentIds.map((departmentId: number) => {
        return departmentId.toString();
      })
      let params = {
        name: name,
        departmentId: departmentStrings,
        page : pageNumber.toString(),
        pageSize: pageSize.toString(),
        orderBy: "id",
        direction: "ASC"
      };
      console.log("Namen and dept: ", this.COURSE_API + '/get' + {params});
      return this.http.get<any[]>(this.COURSE_API + '/get?', {params});
  }

  getCount(): Observable<number> {
    return this.http.get<number>('//localhost:8080/api/courses/count');
  }

  save(course: any): Observable<any> {
    let result: Observable<Object>;
    console.log(course);
    // Remove 'selectLecturers' attribute - only used for list swap
    delete course.selectLecturers;
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
