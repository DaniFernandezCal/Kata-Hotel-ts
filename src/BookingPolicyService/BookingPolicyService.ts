import CompanyRepository from "../repositories/CompanyRepository";
import EmployeeRepository from "../repositories/EmployeeRepository";
import CompanyGateway from "./gateways/CompanyGateway";
import EmployeeGateway from "./gateways/EmployeeGateway";

export interface BookingPolicyServiceDependencies {
  employeeRepository: EmployeeRepository;
  companyRepository: CompanyRepository;
}

export default class BookingPolicyService {
  private companyGateway: CompanyGateway;
  private employeeGateway: EmployeeGateway;

  public constructor(dependencies: BookingPolicyServiceDependencies) {
    this.employeeGateway = new EmployeeGateway(dependencies.employeeRepository);
    this.companyGateway = new CompanyGateway(dependencies.companyRepository);
  }
  public setCompanyPolicy(companyId: string, roomTypes: string[]): void {
    this.companyGateway.setCompanyPolicy(companyId, roomTypes);
  }

  public setEmployeePolicy(employeeId: string, roomTypes: string[]): void {
    this.employeeGateway.setEmployeePolicy(employeeId, roomTypes);
  }

  public isBookingAllowed(employeeId: string, roomType: string): boolean {
    throw new Error("Not implemented");
    return true;
  }
}
