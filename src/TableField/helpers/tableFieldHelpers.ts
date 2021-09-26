import { Employee, Role } from "../types";

export function createData(
    name: string,
    email: string,
    role: Role,
    reportees: Array<Employee>,
    id: number,
  ): Employee {
    return { name, email, role, reportees, id };
  }
  