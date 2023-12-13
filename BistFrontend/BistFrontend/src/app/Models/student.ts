
import{Class} from "./Class"
import { Absence } from "./absence";
import { Grade } from "./grade";
import { studentClass } from "./studentClass";
import { user } from "./user";



export class Student {
    id!: number 
    FullName!: string;
    gender!: string ;
    birthdate!: string ;
    class!:Class;
    enrollementYear!: string ;
    created_At!: Date ;
    updated_At!: Date ;
    user : user[]= [] ;
    grades: Grade[] = [];
    absences: Absence[] = [];
    student:studentClass[]=[];
    
  }
  