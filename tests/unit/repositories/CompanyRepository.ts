import { expect } from "chai";
import CompanyRepository from "../../../src/repositories/CompanyRepository";
import { ERRORS } from "../../../src/repositories/CompanyRepository";

const randomString = () => `${Math.random()}`;

describe("/test/unit/repositories/CompanyRepository", () => {
  let companyRepository: CompanyRepository;
  const companyId = randomString();
  const employeeId = randomString();

  beforeEach(() => {
    companyRepository = new CompanyRepository();
  });

  afterEach(() => {
    companyRepository.cleanCompanies();
  });

  it("should be possible to add a employee in a company", () => {
    companyRepository.addEmployee(companyId, employeeId);
    const companyCreated = companyRepository.getCompany(companyId);
    expect(companyCreated.id).to.be.equal(companyId);
    expect(companyCreated.employees).to.include(employeeId);
  });

  describe("given company created", () => {
    beforeEach(() => {
      companyRepository.addEmployee(companyId, employeeId);
    });

    it("when the same employee is added to the company, should throw an error", () => {
      try {
        companyRepository.addEmployee(companyId, employeeId);
      } catch (e) {
        expect(e.message).to.be.equal(ERRORS.EMPLOYEE_ALREADY_EXISTS);
      }
    });

    it("should be possible to remove a employee from company", () => {
      companyRepository.deleteEmployee(companyId, employeeId);
      const company = companyRepository.getCompany(companyId);
      expect(company.employees).not.include(employeeId);
    });

    it("should be possible to add booking policies to a company", () => {
      const policies = ["suite", "junior"];
      companyRepository.setBookingPolicy(companyId, policies);
      const company = companyRepository.getCompany(companyId);
      expect(company.bookingPolicy).to.be.equal(policies);
    });
  });
});
