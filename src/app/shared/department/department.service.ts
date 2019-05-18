import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  public API = '//localhost:8080/api';
  public DEPARTMENT_API = this.API + '/departments';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    
    
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa('test:test123')});
    return this.http.get(this.DEPARTMENT_API, {headers});
  }

  get(id: string) {
    
    
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa('test:test123')});
    return this.http.get(this.DEPARTMENT_API + '/' + id, {headers});
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