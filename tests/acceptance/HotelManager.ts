import {HotelService} from '../../src/HotelService/HotelService';
import {expect} from 'chai';
import { Room } from '../../src/Models/Hotel';

describe('/tests/acceptance/HotelManager cases', () => {
    let hotelService: HotelService;

    beforeEach((() => {
        hotelService = new HotelService();
    }));

    const addRooms = (hotelId: string, rooms: Room[]) => {
        rooms.forEach(room => {
            hotelService.setRoom(hotelId, room.number, room.type);
        });
    }
    describe('given a hotel created with rooms on it', () => {
        const hotelId = 'hotelId';
        const hotelName = 'hotelName';
        const rooms = [
            {number: 1, type: 'suite'},
            {number: 2, type: 'double'},
            {number: 3, type: 'single'},
        ]
        beforeEach(() => {
            hotelService.addHotel(hotelId, hotelName);
            addRooms(hotelId, rooms);
        });
        it('as an hotel manager should be possible to see all rooms from their hotel', () => {
            const obtainedHotel = hotelService.findHotelBy(hotelId);
            rooms.forEach(room => {
                expect(obtainedHotel.rooms).to.deep.contain(room);
            })
        });
    });
});