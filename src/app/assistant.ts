import {Lecturer} from './lecturer';
import {Department} from './department';

export class Assistant extends Lecturer {

  constructor(_nameSurname: string, _studyField: string, _type: string,
              private _diploma: string, _department: Department,
              _id?: number) {
    super(_nameSurname, _studyField, _type, _department, _id);
  }

  public get diploma(): string {
    return this._diploma;
  }

  public set diploma(value: string) {
    this._diploma = value;
  }
}
