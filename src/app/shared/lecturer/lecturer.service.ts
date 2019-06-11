import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lecturer } from 'src/app/lecturer';

@Injectable({
  providedIn: 'root'
})
export class LecturerService {

  public API = '//localhost:8080/api';
  public LECTURER_API = this.API + '/lecturers';

  constructor(private http: HttpClient) { } bg;

  getAll(): Observable<Lecturer[]> {
    return this.http.get<Lecturer[]>(this.LECTURER_API);
  }

  get(id: string): Observable<Lecturer> {
    return this.http.get<Lecturer>(this.LECTURER_API + '/' + id);
  }

  getAllPaginated(pageNumber: number = 0, pageSize: number = 1): Observable<Lecturer[]> {
    return this.http.get<Lecturer[]>(this.LECTURER_API + '/get?page=' + pageNumber +
      '&size=' + pageSize + '&orderBy=id&direction=ASC');
  }

  getAllByNamePaginated(name: string, pageNumber: number = 0, pageSize: number = 1):
    Observable<Lecturer[]> {
    return this.http.get<Lecturer[]>(this.LECTURER_API + '/get?name=' + name +
      '&page=' + pageNumber + '&size=' + pageSize +
      '&orderBy=id&direction=ASC');
  }

  getAllByDepartmentsPaginated(departmentIds: number[], pageNumber: number = 0,
    pageSize: number = 1): Observable<Lecturer[]> {
    const departmentStrings: string[] = departmentIds.map((departmentId: number) => {
      return departmentId.toString();
    });
    const params = {
      departmentId: departmentStrings,
      page: pageNumber.toString(),
      pageSize: pageSize.toString(),
      orderBy: 'id',
      direction: 'ASC'
    };

    return this.http.get<Lecturer[]>(this.LECTURER_API + '/get?', { params });
  }

  getAllByNameAndDepartmentsPaginated(name: string, departmentIds: number[],
    pageNumber: number = 0, pageSize: number = 1) {
    const departmentStrings: string[] = departmentIds.map((departmentId: number) => {
      return departmentId.toString();
    });
    const params = {
      name: name,
      departmentId: departmentStrings,
      page: pageNumber.toString(),
      pageSize: pageSize.toString(),
      orderBy: 'id',
      direction: 'ASC'
    };
    return this.http.get<Lecturer[]>(this.LECTURER_API + '/get?', { params });
  }
  getCount(): Observable<number> {
    return this.http.get<number>(this.LECTURER_API + '/count');
  }

  save(lecturer: Lecturer): Observable<any> {
    let result: Observable<Object>;
    if (lecturer['id']) {
      result = this.http.put(this.LECTURER_API, lecturer);
    } else {
      result = this.http.post(this.LECTURER_API, lecturer);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
