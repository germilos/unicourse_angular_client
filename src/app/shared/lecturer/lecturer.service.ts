import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Lecturer} from 'src/app/lecturer';

@Injectable({
  providedIn: 'root'
})
export class LecturerService {

  public API = '//localhost:8080/api';
  public LECTURER_API = this.API + '/lecturers';

  private emitChangeSource = new Subject<void>();
  changeEmitted$ = this.emitChangeSource.asObservable();

  constructor(private http: HttpClient) {
  }

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

    return this.http.get<Lecturer[]>(this.LECTURER_API + '/get?', {params});
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
    return this.http.get<Lecturer[]>(this.LECTURER_API + '/get?', {params});
  }

  getCount(): Observable<number> {
    return this.http.get<number>(this.LECTURER_API + '/count');
  }

  save(lecturer: Lecturer): Observable<Object> {
    let result: Observable<Object>;
    if (lecturer['id']) {
      result = this.http.put(this.LECTURER_API, lecturer);
    } else {
      result = this.http.post(this.LECTURER_API, lecturer);
    }
    return result;
  }

  remove(lecturerId: number): Observable<any> {
    const params = new HttpParams();
    params.set('lecturerId', lecturerId.toString());
    return this.http.delete(this.LECTURER_API + '?lecturerId=' + lecturerId);
  }

  emit(): void {
    this.emitChangeSource.next();
  }
}
