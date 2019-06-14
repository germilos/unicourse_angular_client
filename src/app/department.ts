export class Department {

  constructor(private _id: number, private _name: string,
              private _selected?: boolean) {
  }

  public get id() {
    return this._id;
  }

  public set id(value: number) {
    this._id = value;
  }

  public get name() {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get selected(): boolean {
    return this._selected;
  }

  public set selected(value: boolean) {
    this._selected = value;
  }
}
