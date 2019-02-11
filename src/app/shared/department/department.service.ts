import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  public API = '//localhost:8080/api';
  public DEPARTMENT_API = this.API + '/departments';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.DEPARTMENT_API);
  }

  get(id: string) {
    return this.http.get(this.DEPARTMENT_API + '/' + id);
  }

  save(department: any): Observable<any> {
    let result: Observable<Object>;
    if (department['href']) {
      result = this.http.put(department.href, department);
    } else {
      result = this.http.post(this.DEPARTMENT_API, department);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}