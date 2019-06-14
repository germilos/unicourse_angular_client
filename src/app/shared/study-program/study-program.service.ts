import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudyProgramService {

  public API = '//localhost:8080/api';
  public STUDY_PROGRAM_API = this.API + '/studyprograms';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.STUDY_PROGRAM_API);
  }

  get(id: string) {
    return this.http.get(this.STUDY_PROGRAM_API + '/' + id);
  }

  save(studyProgram: any): Observable<any> {
    let result: Observable<Object>;
    if (studyProgram['href']) {
      result = this.http.put(studyProgram.href, studyProgram);
    } else {
      result = this.http.post(this.STUDY_PROGRAM_API, studyProgram);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
