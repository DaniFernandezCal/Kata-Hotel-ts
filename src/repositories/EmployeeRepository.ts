import { Employee } from "../Models/Employee";

export const ERRORS = {
  EMPLOYEE_ALREADY_EXISTS: "Employee with given id already exists",
  EMPLOYEE_DOESNT_EXISTS: "Employee with given id doesnt exists",
};

export default class EmployeeRepository {
  private employees: Employee[];

  public constructor() {
    this.employees = [];
  }

  public createEmployee(employeeId: string) {
    const employee = this.getEmployee(employeeId);
    if (employee) {
      throw new Error(ERRORS.EMPLOYEE_ALREADY_EXISTS);
    }
    const newEmployee = {
      id: employeeId,
      bookingPolicy: [],
    };
    this.employees.push(newEmployee);
  }

  public getEmployee(employeeId: string): Employee {
    return this.employees.filter((employee) => employee.id === employeeId)[0];
  }

  public setBookingPolicy(employeeId: string, bookingPolicy: string[]) {
    const employee = this.createEmployeeIfNotExists(employeeId);
    employee.bookingPolicy = bookingPolicy;
  }

  public cleanEmployees() {
    this.employees = [];
  }

  private createEmployeeIfNotExists(employeeId: string): Employee {
    if (!this.getEmployee(employeeId)) {
      this.createEmployee(employeeId);
    }
    return this.getEmployee(employeeId);
  }
}
