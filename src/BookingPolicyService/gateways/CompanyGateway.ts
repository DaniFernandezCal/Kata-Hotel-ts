import CompanyRepository from "../../repositories/CompanyRepository";

export default class CompanyGateway {
  private companyRepository: CompanyRepository;

  public constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  public setCompanyPolicy(companyId: string, policies: string[]): void {
    this.companyRepository.setBookingPolicy(companyId, policies);
  }
}
