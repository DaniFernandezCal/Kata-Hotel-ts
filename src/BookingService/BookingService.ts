import { Booking } from "../Models/Booking";

export default class BookingService {
  public constructor() {}
  public book(
    employeeId: string,
    hotelId: string,
    roomType: string,
    checkIn: number,
    checkOut: number
  ): Booking {
    throw new Error("not implemented");
  }
}
