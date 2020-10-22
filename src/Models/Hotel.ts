export interface Room {
    number: number;
    type: string;
}

export interface Hotel {
    id: string;
    name: string;
    rooms: Room[];
}