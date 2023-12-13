import { userRole } from "./userRole";

export class role {
    id ?: number;
    name?: string;
    userRoles?: userRole[] = [];
}