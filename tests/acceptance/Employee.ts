import { expect } from "chai";
import BookingService from "../../src/BookingService/BookingService";

const randomString = () => `${Math.random()}`;

describe.only("/tests/acceptance/Employee use cases", () => {
  const employeeId = randomString();
  const hotelId = randomString();
  const roomType = "suite";
  const checkIn = 1;
  const checkOut = 3;

  let bookingService: BookingService;

  beforeEach(() => {
    bookingService = new BookingService();
  });

  it("as a employee, want to book a hotel room", () => {
    const booking = bookingService.book(
      employeeId,
      hotelId,
      roomType,
      checkIn,
      checkOut
    );
    expect(booking.employeeId).to.be.equal(employeeId);
    expect(booking.hotelId).to.be.equal(hotelId);
    expect(booking.roomType).to.be.equal(roomType);
    expect(booking.checkIn).to.be.equal(checkIn);
    expect(booking.checkOut).to.be.equal(checkOut);
    expect(booking).to.have.deep.property("id");
  });
});
