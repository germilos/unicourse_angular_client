import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lecturer } from 'src/app/lecturer';
import { Department } from 'src/app/department';

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

  getAllPaginated(pageNumber: number = 0, pageSize: number = 1): Observable<Lecturer[]> {
    console.log("PAGINATED: ", this.LECTURER_API + '/get?page=' + pageNumber +
    '&size=' + pageSize + '&orderBy=id&direction=ASC');
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
    let departmentStrings: string[] = departmentIds.map((departmentId: number) => {
      return departmentId.toString();
    })
    let params = {
      departmentId: departmentStrings,
      page : pageNumber.toString(),
      pageSize: pageSize.toString(),
      orderBy: "id",
      direction: "ASC"
    };
    console.log("DEPARTMENTS: ", this.LECTURER_API + '/get' + {params});

    return this.http.get<Lecturer[]>(this.LECTURER_API + '/get?', {params})        
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
      console.log("Namen and dept: ", this.LECTURER_API + '/get' + {params});
      return this.http.get<Lecturer[]>(this.LECTURER_API + '/get?', {params});
    }
  getCount(): Observable<number> {
    return this.http.get<number>('//localhost:8080/api/lecturers/count');
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
