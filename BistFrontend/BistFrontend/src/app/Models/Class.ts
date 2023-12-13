import { Grade } from "./grade";
import { studentClass } from "./studentClass";
import { userClass } from "./userClass";



export class Class {
  id!: number;
  level!: string;
  studentNbr!: number; 
  status!: string;
  created_at!: Date;
  updated_at!: Date;
  grade: Grade[] = [];
  teacher: userClass[] = [];
  students: studentClass[] = [];
}