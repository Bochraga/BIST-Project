import { Class } from "./Class";
import { Subject } from "./Subject";
import { complaint } from "./complaint";
import { userRole } from "./userRole";

export class user {
    id ?: number;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    birthdate?: string;
    phone?: number;
    occupation?: string;
    address?: string;
    username?: string;
    nationality?: string;
    enabled?:boolean;
    role?: userRole;
    // complaints?: complaint[]
    classId?: Class[];
    subjectId?:Subject[];
 }
