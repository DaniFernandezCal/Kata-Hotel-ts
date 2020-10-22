import { Company } from "../Models/Company";

export const ERRORS = {
  EMPLOYEE_ALREADY_EXISTS: "Employee already exists in given company",
};

export default class CompanyRepository {
  private companies: Company[];

  constructor() {
    this.companies = [];
  }

  public addEmployee(companyId: string, employeeId: string) {
    const company = this.createCompanyIfNotExists(companyId);
    if (company.employees.includes(employeeId)) {
      throw new Error(ERRORS.EMPLOYEE_ALREADY_EXISTS);
    }
    company.employees.push(employeeId);
  }

  public deleteEmployee(companyId: string, employeeId: string) {
    const company = this.getCompany(companyId);
    const index = company.employees.indexOf(employeeId);
    if (index > -1) {
      company.employees.splice(index, 1);
    }
  }

  public setBookingPolicy(companyId: string, policies: string[]) {
    const company = this.createCompanyIfNotExists(companyId);
    company.bookingPolicy = policies;
  }

  public cleanCompanies() {
    this.companies = [];
  }

  private createCompanyIfNotExists(companyId: string) {
    if (!this.companyExists(companyId)) {
      this.createCompany(companyId);
    }
    return this.getCompany(companyId);
  }

  private companyExists(companyId: string): boolean {
    const company = this.companies.filter(
      (company) => company.id === companyId
    );
    return company.length !== 0;
  }

  private createCompany(companyId: string): void {
    const company = {
      id: companyId,
      employees: [],
      bookingPolicy: [],
    };
    this.companies.push(company);
  }

  public getCompany(companyId: string): Company {
    return this.companies.filter((company) => company.id === companyId)[0];
  }
}
