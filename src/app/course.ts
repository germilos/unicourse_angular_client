import { Department } from './department';
import { Lecturer } from './lecturer';
import { StudyProgram } from './study-program';
import { CourseUnit } from './course-unit';

export class Course {

    constructor(private _name: string, private _goal: string,
                private _status: string, private _espb: number,
                private _department: Department, 
                private _studyProgram: StudyProgram,
                private _courseUnits: CourseUnit[],
                private _lecturers: Lecturer[], private _id?: number) {}

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get goal(): string {
        return this._goal;
    }

    public set goal(value: string) {
        this._goal = value;
    }

    public get status(): string {
        return this._status;
    }

    public set status(value: string) {
        this._status = value;
    }

    public get espb(): number {
        return this._espb;
    }

    public set espb(value: number) {
        this._espb = value;
    }

    public get department(): Department {
        return this._department;
    }

    public set department(value: Department) {
        this._department = value;
    }

    public get studyProgram(): StudyProgram {
        return this._studyProgram;
    }

    public set studyProgram(value: StudyProgram) {
        this._studyProgram = value;
    }

    public get courseUnits(): CourseUnit[] {
        return this._courseUnits;
    }

    public set courseUnits(value: CourseUnit[]) {
        this._courseUnits = value;
    }

    public get lecturers(): Lecturer[] {
        return this._lecturers;
    }

    public set lecturers(value: Lecturer[]) {
        this._lecturers = value;
    }

    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

}

