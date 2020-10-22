import { expect } from "chai";
import EmployeeRepository from "../../../src/repositories/EmployeeRepository";

const randomString = () => `${Math.random()}`;

describe("tests/unit/EmployeeRepository", () => {
  let employeeRepository: EmployeeRepository;
  const employeeId = randomString();

  beforeEach(() => {
    employeeRepository = new EmployeeRepository();
  });

  afterEach(() => {
    employeeRepository.cleanEmployees();
  });

  it("should be possible to create a employee", () => {
    employeeRepository.createEmployee(employeeId);
    const createdEmployee = employeeRepository.getEmployee(employeeId);
    expect(createdEmployee.id).to.be.equal(employeeId);
  });

  describe("given employee created", () => {
    const policies = ["suit", "regular"];
    beforeEach(() => {
      employeeRepository.createEmployee(employeeId);
    });

    it("should be possible to add a booking policy to a employee", () => {
      employeeRepository.setBookingPolicy(employeeId, policies);
      const employee = employeeRepository.getEmployee(employeeId);
      expect(employee.bookingPolicy).to.be.equal(policies);
    });

    describe("given booking policies added to employee", () => {
      beforeEach(() => {
        employeeRepository.setBookingPolicy(employeeId, policies);
      });

      it("when policies are added to employee that already has policies, should be updated with the new ones", () => {
        const newPolicies = ["kids"];
        employeeRepository.setBookingPolicy(employeeId, newPolicies);
        const employee = employeeRepository.getEmployee(employeeId);
        expect(employee.bookingPolicy).to.be.equal(newPolicies);
      });
    });
  });
});
