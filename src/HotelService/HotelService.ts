import { Hotel } from '../Models/Hotel';
import HotelRepository from '../repositories/HotelRepository';

export class HotelService {
    private hotelRepository: HotelRepository;

    public constructor() {
        this.hotelRepository = new HotelRepository();
    }

    public addHotel(id: string, name: string): Hotel {
       return this.hotelRepository.createHotel(id, name);
    };

    public setRoom(hotelId: string, number: number, type: string): void {
        return this.hotelRepository.addRoom(hotelId, number, type);
    };

    public findHotelBy(hotelId: string): Hotel {
        return this.hotelRepository.findHotel(hotelId);
    };

    public cleanRooms(): void {
        this.hotelRepository.cleanRooms();
    };

}