import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LecturerService {

  public API = '//localhost:8080/api';
  public LECTURER_API = this.API + '/lecturers';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.LECTURER_API);
  }

  get(id: string) {
    return this.http.get(this.LECTURER_API + '/' + id);
  }

  save(lecturer: any): Observable<any> {
    let result: Observable<Object>;
    if (lecturer['href']) {
      result = this.http.put(lecturer.href, lecturer);
    } else {
      result = this.http.post(this.LECTURER_API, lecturer);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
