import { Hotel } from "../Models/Hotel";

export const ERRORS = {
  HOTEL_NOT_FOUND: "Hotel Not Found",
  HOTEL_ALREADY_EXISTS: "Hotel Already Exists",
};

export default class HotelRepository {
  private hotels: Hotel[];

  constructor() {
    this.hotels = [];
  }

  public createHotel(id: string, name: string): Hotel {
    if (this.hotelExists(id)) {
      throw new Error(ERRORS.HOTEL_ALREADY_EXISTS);
    }
    const hotel = {
      id,
      name,
      rooms: [],
    };
    this.hotels.push(hotel);
    return hotel;
  }

  public findHotel(id: string): Hotel {
    const hotel = this.hotels.filter((hotel) => hotel.id === id);
    if (hotel.length === 0) {
      throw new Error(ERRORS.HOTEL_NOT_FOUND);
    }
    return hotel[0];
  }

  public addRoom(hotelId: string, roomNumber: number, roomType: string) {
    if (!this.hotelExists(hotelId)) {
      throw new Error(ERRORS.HOTEL_NOT_FOUND);
    }
    const room = {
      number: roomNumber,
      type: roomType,
    };
    this.hotels.forEach((hotel) => {
      if (hotel.id === hotelId) {
        hotel.rooms.push(room);
      }
    });
  }

  public cleanRooms() {
    this.hotels = [];
  }

  private hotelExists(id: string): boolean {
    const hotel = this.hotels.filter((hotel) => hotel.id === id);
    return hotel.length !== 0;
  }
}
