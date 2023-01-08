export default interface ITrip {
    _id: string;
    line_id: string;
    phone1: string;
    phone2: string;
    driver1id: string;
    driver2id: string;
    seatsBooked: number[];
    fare: String;
    imagePath: String;
}

interface ILine {
    name_line: string;
    arrival: string;
    departure: string;
    to: string;
    from: string;
}
