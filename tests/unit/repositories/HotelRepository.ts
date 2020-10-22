import { expect } from "chai";
import { ERRORS } from "../../../src/repositories/HotelRepository";
import HotelRepository from "../../../src/repositories/HotelRepository";

const randomString = () => `${Math.random()}`;

describe("/tests/unit/repositories/HotelRepository", () => {
  let hotelRepository: HotelRepository;
  const hotelId = randomString();
  const hotelName = randomString();

  beforeEach(() => {
    hotelRepository = new HotelRepository();
  });

  afterEach(() => {
    hotelRepository.cleanRooms();
  });

  it("should be possible to create a hotel", () => {
    const hotelCreated = hotelRepository.createHotel(hotelId, hotelName);
    expect(hotelCreated.id).to.be.equal(hotelId);
    expect(hotelCreated.name).to.be.equal(hotelName);
    expect(hotelCreated.rooms).to.be.empty;
  });

  it("when try to add room to an unexistent hotel should throw an error", () => {
    try {
      hotelRepository.addRoom("unexistenteHotel", 1, "suite");
      throw new Error("Expected an Error");
    } catch (err) {
      expect(err.message).to.be.equal(ERRORS.HOTEL_NOT_FOUND);
    }
  });

  describe("given hotel created", () => {
    beforeEach(() => {
      hotelRepository.createHotel(hotelId, hotelName);
    });
    it("should be possible to add room to a hotel", () => {
      const roomNumber = 1;
      const roomType = "suite";
      hotelRepository.addRoom(hotelId, roomNumber, roomType);
      const hotel = hotelRepository.findHotel(hotelId);
      expect(hotel.rooms).to.deep.contain({
        number: roomNumber,
        type: roomType,
      });
    });
    it("when try to create a hotel with same id should throw an already exists error", () => {
      try {
        hotelRepository.createHotel(hotelId, hotelName);
        throw new Error("Expected an error");
      } catch (err) {
        expect(err.message).to.be.equal(ERRORS.HOTEL_ALREADY_EXISTS);
      }
    });
  });
});
