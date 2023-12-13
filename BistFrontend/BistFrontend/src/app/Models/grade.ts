import { Class } from "./Class";
import { Subject } from "./Subject";
import { Student } from "./student";

export class Grade {
    id!: number;
    subject: Subject[]=[];
    student_name!: string;
    grade!: number;
    semester!: number;
    created_At!: Date;
    updated_At!: Date;
    student: Student[]=[];
    classe:Class[]=[];
}