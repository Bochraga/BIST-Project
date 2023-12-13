import { Class } from "./Class";
import { Student } from "./student";
import { Subject } from "./Subject";

export class Absence{
    id!:number;
    date!:string;
    hour!:string;
    subject: Subject[]=[];
    semester!:number;
    created_at!:any;
    updated_at!:any;
    student: Student[]=[];
    class:Class[]=[];
}