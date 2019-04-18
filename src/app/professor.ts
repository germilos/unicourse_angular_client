import { Lecturer } from './lecturer';
import { Department } from './department';

export class Professor extends Lecturer {

    constructor(_nameSurname: string, _studyField: string, private _position: string,
                private _researchNumber: number, _type: string, _department: Department,
                 _id?: number) {
        super(_nameSurname, _studyField, _type, _department, _id);
    }

    public get researchNumber(): number {
        return this._researchNumber;
    }
    public set researchNumber(value: number) {
        this._researchNumber = value;
    }
    public get position(): string {
        return this._position;
    }
    public set position(value: string) {
        this._position = value;
    }
}
