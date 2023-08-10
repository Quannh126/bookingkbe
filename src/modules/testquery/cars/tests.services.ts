import { Car, ICar, ICarDetail } from "@modules/cars";
import { isEmptyObject } from "@core/utils/helper";
import sendMail from "@core/utils/sendmail"
import genarateEmail from "@core/utils/generateEmail"
import { HttpException } from "@core/exceptions";
import { IPagination, NameValue } from "@core/interfaces";
import { AddCarDto, UpdateCarDto } from "@modules/cars/dto";
import { Booking } from "@modules/book";
import { Trip } from "@modules/trips";
import IBookingTrip from "@modules/book/interfaces/booking-trip.interface";
// import ICarDetail from "./interfaces/carDetail.interface";

class TestsService {
    public carModel = Car;
    public bookingModel = Booking;
    public tripModel = Trip;

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
                "$match": {
                    "$or": [
                        {
                            "bookings.journey_date": new Date(journey_date),
                        },
                        {
                            "bookings": [],
                        },
                    ],
                    "from_id": route.split("-")[0],
                    "to_id": route.split("-")[1],
                    "dropoff_point.district_id": dd,
                    "dropoff_point.point_id": dp,
                    "pickup_point.district_id": pd,
                    "pickup_point.point_id": pp,
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
        ];
        console.log(pipeline);
        const listBooked = await this.tripModel.aggregate(pipeline).exec();
        if (listBooked) {
            return listBooked;
        }
        return [];
    }

    public async testSendMail(): Promise<string> {
        try {
            // const email = await genarateEmail({
            //     name: "Quan",
            //     pickup: "Ha noi",
            //     dropoff: "Tuyen quang",
            //     start_time: "12:21",
            //     seat: "12",
            //     ticket_code: "12312312",
            //     payment_code: "212cashjkda",
            //     amount: "12000 d",
            // }).catch(err => {
            //     console.log("ErrorGenerate: ", err)
            // });
            // console.log('email: ', email)
            await sendMail.sendMail('quankidz96@gmail.com', "Test email", await genarateEmail({
                name: "Quan",
                pickup: "Ha noi",
                dropoff: "Tuyen quang",
                start_time: "12:21",
                seat: "12",
                ticket_code: "12312312",
                payment_code: "212cashjkda",
                amount: "12000 d",
                journey_date: "12323"
            }));
            return 'sendMailSuccess';
        } catch (error) {
            console.log(error)
            return error as string
        } finally {
            return "";
        }
    }
}
export default TestsService;
