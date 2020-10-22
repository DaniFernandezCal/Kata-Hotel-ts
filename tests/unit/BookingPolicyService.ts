import { expect } from "chai";
import BookingPolicyService from "../../src/BookingPolicyService/BookingPolicyService";
import CompanyRepository from "../../src/repositories/CompanyRepository";
import EmployeeRepository from "../../src/repositories/EmployeeRepository";

const randomString = () => `${Math.random()}`;

describe("/tests/unit/BookingPolicyService", () => {
  const companyId = randomString();
  const employeeId = randomString();
  let bookingPolicyService: BookingPolicyService;
  let companyRepository: CompanyRepository;
  let employeeRepository: EmployeeRepository;

  beforeEach(() => {
    companyRepository = new CompanyRepository();
    employeeRepository = new EmployeeRepository();
    bookingPolicyService = new BookingPolicyService({
      employeeRepository,
      companyRepository,
    });
  });

  it("should be possible to set a booking policy in a company", () => {
    const companyPolicies = ["suit"];
    bookingPolicyService.setCompanyPolicy(companyId, companyPolicies);
    const company = companyRepository.getCompany(companyId);
    expect(company.bookingPolicy).to.be.equal(companyPolicies);
  });

  describe("given created employee", () => {
    beforeEach(() => {
      employeeRepository.createEmployee(employeeId);
    });

    it("should be possible to set a booking policy in a employee", () => {
      const employeePolicies = ["suit"];
      bookingPolicyService.setEmployeePolicy(employeeId, employeePolicies);
      const employee = employeeRepository.getEmployee(employeeId);
      expect(employee.bookingPolicy).to.be.equal(employeePolicies);
    });
  });

  it("should be possible know if booking is allowed");
});
