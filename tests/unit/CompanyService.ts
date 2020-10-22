import { expect } from "chai";
import CompanyService from "../../src/CompanyService/CompanyService";
import { ERRORS } from "../../src/repositories/CompanyRepository";

const randomString = () => `${Math.random()}`;
describe("/tests/unit/CompanyService unit test cases", () => {
  let companyService: CompanyService;
  const companyId = randomString();
  const employeeId = randomString();

  beforeEach(() => {
    companyService = new CompanyService();
  });

  afterEach(() => {
    companyService.cleanCompanies();
  });

  it("should be possible to add to a company", () => {
    companyService.addEmployee(companyId, employeeId);
    const company = companyService.getCompany(companyId);
    expect(company.employees).to.include(employeeId);
  });

  describe("given employee added to a company", () => {
    beforeEach(() => {
      companyService.addEmployee(companyId, employeeId);
    });

    it("should be possible to remove a employee from a company", () => {
      companyService.deleteEmployee(companyId, employeeId);
      const company = companyService.getCompany(companyId);
      expect(company.employees).to.not.include(employeeId);
    });

    it("when try to add the same employee to a company should throw an error", () => {
      try {
        companyService.addEmployee(companyId, employeeId);
      } catch (e) {
        expect(e.message).to.be.equal(ERRORS.EMPLOYEE_ALREADY_EXISTS);
      }
    });
  });
});
