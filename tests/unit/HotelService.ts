import { expect } from 'chai';
import {HotelService} from '../../src/HotelService/HotelService';
import { ERRORS } from '../../src/repositories/HotelRepository';

const randomString = () => `${Math.random()}`;

describe('/tests/unit/HotelService test cases', () => {
    let hotelId: string;
    let hotelName: string;
    let hotelService: HotelService;

    beforeEach(() => {
        hotelService = new HotelService();
    });

    afterEach(() => {
        hotelService.cleanRooms();
    });

    it('should be possible to add new hotel', () => {
        hotelId = randomString();
        hotelName = randomString();
        const hotel = hotelService.addHotel(hotelId, hotelName);
        expect(hotel.name).to.be.equal(hotelName);
        expect(hotel.id).to.be.equal(hotelId);
        expect(hotel.rooms).to.be.empty;
    });

    it('should throw an error when try to set room information in an unexistent hotel', () => {
        try {
            hotelService.setRoom('undefined', 1, 'suite');
            throw new Error('Expected an error');
        } catch (err) {
            expect(err.message).to.be.equal(ERRORS.HOTEL_NOT_FOUND);
        }
    });

    describe('given hotel created', () => {
        beforeEach(() => {
            hotelId = randomString();
            hotelName = randomString();
            hotelService.addHotel(hotelId, hotelName);
        });

        it('should be possible to set room information in the hotel', () => {
            const roomNumber = 1;
            const roomType = 'suite';
            hotelService.setRoom(hotelId, roomNumber, roomType);
            const hotel = hotelService.findHotelBy(hotelId);
            expect(hotel.rooms).to.deep.contain({
                number: roomNumber,
                type: roomType,
            })
        });

        it('should throw an error when another hotel is created with the same id', () => {
            try {
                hotelService.addHotel(hotelId, hotelName);
                throw new Error('Expected an error');
            } catch (err) {
                expect(err.message).to.be.equal(ERRORS.HOTEL_ALREADY_EXISTS);
            }
        });

        describe('given room information setted in the hotel', () => {
            const number = 1;
            const type = 'suite';

            beforeEach(() => {
                hotelService.setRoom(hotelId, number, type);
            });

            it('should be possible to get information about the rooms from the hotel', () => {
                const hotel = hotelService.findHotelBy(hotelId);
                expect(hotel.rooms).to.deep.contain({
                    number,
                    type,
                });
            });
        });
    });
});