export enum Role {
  Developer = "Developer",
  Designer = "Designer",
}

export type Employee = {
  name: string;
  email: string;
  role: Role;
  reportees?: Array<Employee>;
  id: number;
};
