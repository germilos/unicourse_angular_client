import {Department} from './department';

export abstract class Lecturer {

  constructor(private _nameSurname: string, private _studyField: string,
              private _type: string, private _department: Department,
              private _id?: number) {
  }

  public get type(): string {
    return this._type;
  }

  public set type(value: string) {
    this._type = value;
  }

  public get department(): Department {
    return this._department;
  }

  public set department(value: Department) {
    this._department = value;
  }

  public get nameSurname(): string {
    return this._nameSurname;
  }

  public set nameSurname(value: string) {
    this._nameSurname = value;
  }

  public get studyField(): string {
    return this._studyField;
  }

  public set studyField(value: string) {
    this._studyField = value;
  }

  public get id(): number {
    return this._id;
  }

  public set id(value: number) {
    this._id = value;
  }
}
