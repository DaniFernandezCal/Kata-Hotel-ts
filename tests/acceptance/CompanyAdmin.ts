import { expect } from "chai";
import CompanyService from "../../src/CompanyService/CompanyService";
import BookingPolicyService from "../../src/BookingPolicyService/BookingPolicyService";
import EmployeeRepository from "../../src/repositories/EmployeeRepository";
import CompanyRepository from "../../src/repositories/CompanyRepository";

const randomString = () => `${Math.random()}`;

describe("/tests/acceptance/CompanyAdmin cases", () => {
  let companyService: CompanyService;
  let bookingPolicyService: BookingPolicyService;
  let employeeRepository: EmployeeRepository;
  let companyRepository: CompanyRepository;

  const companyId = randomString();
  const employeeId = randomString();

  beforeEach(() => {
    employeeRepository = new EmployeeRepository();
    companyRepository = new CompanyRepository();
    companyService = new CompanyService(companyRepository);
    bookingPolicyService = new BookingPolicyService({
      companyRepository,
      employeeRepository,
    });
  });

  it("as a company admin want to add a employee to my company", () => {
    companyService.addEmployee(companyId, employeeId);
    const company = companyService.getCompany(companyId);
    expect(company.employees).to.include(employeeId);
  });

  describe("given company created with employee", () => {
    beforeEach(() => {
      companyService.addEmployee(companyId, employeeId);
    });

    it("as a company admin want to delete a employee from my company", () => {
      companyService.deleteEmployee(companyId, employeeId);
      const company = companyService.getCompany(companyId);
      expect(company.employees).to.not.include(employeeId);
    });
  });

  it("as a company admin want to create booking policy to my company", () => {
    const policies = ["suite", "junior"];
    bookingPolicyService.setCompanyPolicy(companyId, policies);
    const company = companyService.getCompany(companyId);
    expect(company.bookingPolicy).to.be.equal(policies);
  });

  it("as a company admin want to create booking policy to my employee", () => {
    const policies = ["suite", "junior"];
    bookingPolicyService.setEmployeePolicy(employeeId, policies);
    const employee = employeeRepository.getEmployee(employeeId);
    expect(employee.bookingPolicy).to.be.equal(policies);
  });
});
