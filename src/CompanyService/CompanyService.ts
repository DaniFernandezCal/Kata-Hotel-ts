import { Company } from "../Models/Company";
import CompanyRepository from "../repositories/CompanyRepository";

export default class CompanyService {
  private companyRepository: CompanyRepository;

  public constructor(companyRepository?: CompanyRepository) {
    this.companyRepository = companyRepository
      ? companyRepository
      : new CompanyRepository();
  }

  public addEmployee(companyId: string, employeeId: string): void {
    this.companyRepository.addEmployee(companyId, employeeId);
  }

  public deleteEmployee(companyId: string, employeeId: string): void {
    this.companyRepository.deleteEmployee(companyId, employeeId);
  }

  public getCompany(companyId: string): Company {
    return this.companyRepository.getCompany(companyId);
  }

  public cleanCompanies(): void {
    this.companyRepository.cleanCompanies();
  }
}
