import { Seat } from "./seat.models";

export class Theater {
    id?: number;
    location: string;
    capacity: number;

    seats?: Seat[];
}
