import EmployeeRepository from "../../repositories/EmployeeRepository";

export default class EmployeeGateway {
  private employeeRepository: EmployeeRepository;

  public constructor(employeeRepository: EmployeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  public setEmployeePolicy(employeeId: string, policies: string[]): void {
    this.employeeRepository.setBookingPolicy(employeeId, policies);
  }
}
