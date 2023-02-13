import { isEmptyObject } from "@core/utils/helper";
import { HttpException } from "@core/exceptions";
import { IPagination, NameValue } from "@core/interfaces";
import Booking from "./book.model";
import AddBookingDto from "./dto/add_booking.dto";
import IBooking from "./interfaces/book.interface";
import IBookingTrip from "./interfaces/booking-trip.interface";
import { Trip } from "@modules/trips";

// import ICarDetail from "./interfaces/carDetail.interface";

class BookingService {
    public bookingModel = Booking;
    public tripModel = Trip;
    public async booking(model: AddBookingDto): Promise<void> {
        if (isEmptyObject(model)) {
            throw new HttpException(400, "Model is empty");
        }
        const query = {
            journey_date: model.journey_date,
            trip_id: model.trip_id,
        };
        const listBooked = await this.bookingModel.find(query).exec();
        let listBookedSeat: Array<string> = [];
        listBooked.forEach((book) => {
            listBookedSeat.push(book.seat);
        });
        const selectedSeats: Array<string> = model.selected_seats!.split("-");
        const commonSeat = await listBookedSeat.filter((x) =>
            selectedSeats.includes(x)
        );

        const documents = [];
        for (let seat of selectedSeats) {
            const newObject = { ...model } as Record<string, any>;
            newObject.seat = seat;
            delete newObject.selected_seats;
            documents.push(newObject);
        }

        if (commonSeat.length > 0) {
            throw new HttpException(
                409,
                `Các chỗ ${commonSeat.join(",")} đã được đặt`
            );
        } else {
            await this.bookingModel.create(documents);
        }
    }
    public async getSearchBooking(
        journey_date: string,
        route: string,
        pickup_point: string,
        dropoff_point: string
    ): Promise<Array<IBookingTrip>> {
        if (!journey_date || !route || route.split("-").length != 2) {
            throw new HttpException(400, "Query error");
        }
        console.log(pickup_point);
        console.log(dropoff_point);
        const dd = !dropoff_point
            ? { "$exists": true }
            : dropoff_point.split("-")[0];
        const dp = !dropoff_point
            ? { "$exists": true }
            : dropoff_point.split("-")[1];
        const pd = !pickup_point
            ? { "$exists": true }
            : pickup_point.split("-")[0];
        const pp = !pickup_point
            ? { "$exists": true }
            : pickup_point.split("-")[1];
        const pipeline = [
            {
                "$project": {
                    "_id": {
                        "$toString": "$_id",
                    },
                    "trip_id": "$_id",
                    "capacity": "$car.capacity",
                    "from_id": "$from_id",
                    "to_id": "$to_id",
                    "pickup_point": "$pickup_point",
                    "dropoff_point": "$dropoff_point",
                    "car": "$car",
                    "departure_time": "$departure_time",
                    "destination_time": "$destination_time",
                    "seats_booked": "$seats_booked",
                    "fare": "$fare",
                    "sell_type": "$sell_type",
                },
            },
            {
                "$lookup": {
                    "from": "bookings",
                    "localField": "_id",
                    "foreignField": "trip_id",
                    "as": "bookings",
                },
            },
            {
                "$project": {
                    "bookings": {
                        "$cond": [
                            {
                                "$eq": [
                                    {
                                        "$cond": [
                                            {
                                                "$eq": ["$bookings", []],
                                            },
                                            false,
                                            {
                                                "$reduce": {
                                                    "input": "$bookings",
                                                    "initialValue": false,
                                                    "in": {
                                                        "$or": [
                                                            "$$value",
                                                            {
                                                                "$eq": [
                                                                    "$$this.journey_date",
                                                                    new Date(
                                                                        journey_date
                                                                    ),
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                    true,
                                ],
                            },
                            {
                                "$filter": {
                                    "input": "$bookings",
                                    "as": "booking",
                                    "cond": {
                                        "$eq": [
                                            "$$booking.journey_date",
                                            new Date(journey_date),
                                        ],
                                    },
                                },
                            },
                            [],
                        ],
                    },
                    "trip_id": "$_id",
                    "capacity": "$car.capacity",
                    "from_id": "$from_id",
                    "to_id": "$to_id",
                    "pickup_point": "$pickup_point",
                    "dropoff_point": "$dropoff_point",
                    "car": "$car",
                    "departure_time": "$departure_time",
                    "destination_time": "$destination_time",
                    "seats_booked": "$seats_booked",
                    "fare": "$fare",
                    "sell_type": "$sell_type",
                },
            },
            {
                "$project": {
                    "trip_id": "$_id",
                    "pickup_point": "$pickup_point",
                    "dropoff_point": "$dropoff_point",
                    "car": "$car",
                    "departure_time": "$departure_time",
                    "destination_time": "$destination_time",
                    "fare": "$fare",
                    "sell_type": "$sell_type",
                    "from_id": "$from_id",
                    "to_id": "$to_id",
                    "seat_booked": {
                        "$cond": [
                            {
                                "$eq": ["$bookings", []],
                            },
                            {
                                "$concat": ["0", "/", "$capacity"],
                            },
                            {
                                "$let": {
                                    "vars": {
                                        "seatsBooked": {
                                            "$toString": {
                                                "$size": "$bookings",
                                            },
                                        },
                                    },
                                    "in": {
                                        "$concat": [
                                            "$$seatsBooked",
                                            "/",
                                            "$capacity",
                                        ],
                                    },
                                },
                            },
                        ],
                    },
                    "seat_detail": {
                        "$cond": [
                            {
                                "$eq": ["$bookings", []],
                            },
                            [],
                            {
                                "$map": {
                                    "input": "$bookings",
                                    "as": "booking",
                                    "in": {
                                        "booking": "$$booking",
                                        "customer": "$$booking.customer",
                                        "seat": "$$booking.seat",
                                    },
                                },
                            },
                        ],
                    },
                },
            },
            {
                "$match": {
                    "from_id": route.split("-")[0],
                    "to_id": route.split("-")[1],
                    "dropoff_point.district_id": dd,
                    "dropoff_point.point_id": dp,
                    "pickup_point.district_id": pd,
                    "pickup_point.point_id": pp,
                },
            },
        ];

        const listBooked = await this.tripModel.aggregate(pipeline).exec();
        if (listBooked) {
            return listBooked;
        }
        return [];
    }
}
export default BookingService;
