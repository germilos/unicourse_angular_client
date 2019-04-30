export class StudyProgram {

    constructor(private _name: string, private _accreditationYear: string,
                private _id?: number) { }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get accreditationYear(): string {
        return this._accreditationYear;
    }
    public set accreditationYear(value: string) {
        this._accreditationYear = value;
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
}
