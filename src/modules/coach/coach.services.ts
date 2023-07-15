import { isEmptyObject } from "@core/utils/helper";
import { HttpException } from "@core/exceptions";
import { IPagination, NameValue } from "@core/interfaces";

import IBooking from "./interfaces/book.interface";
import IBookingTrip from "./interfaces/booking-trip.interface";
import { Trip } from "@modules/trips";
import { Customer, ICustomer } from "@modules/customer";

import { Booking } from "@modules/book";
import SwapSeatDTO from "@modules/book/dto/seat_swap.dto";
import CheckSeatDTO from "./dto/check-seat.dto";
import AddBookingDto from "@modules/book/dto/add_booking.dto";
import Payment from "@modules/payment/payment.model";

// import ICarDetail from "./interfaces/carDetail.interface";

class CoachService {
    public bookingModel = Booking;
    public tripModel = Trip;
    public customerModel = Customer;
    public paymentModel = Payment;
    public async getSearchBooking(
        journey_date: string,
        route: string,
        pickup_point: string,
        dropoff_point: string,
        type_car: string,
        capacity: string
    ): Promise<Array<IBookingTrip>> {
        if (!journey_date || !route || route.split("-").length != 2) {
            throw new HttpException(400, "Query error");
        }
        const tc = !type_car ? { "$exists": true } : type_car;
        const cp = !capacity ? { "$exists": true } : capacity;
        const dd = !dropoff_point
            ? { "$exists": true }
            : Number(dropoff_point.split("-")[0]);
        const dp = !dropoff_point
            ? { "$exists": true }
            : Number(dropoff_point.split("-")[1]);
        const pd = !pickup_point
            ? { "$exists": true }
            : Number(pickup_point.split("-")[0]);
        const pp = !pickup_point
            ? { "$exists": true }
            : Number(pickup_point.split("-")[1]);

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
                    "journey_date": journey_date,
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
                    "car.type_car": tc,
                    "car.capacity": cp,
                },
            },
        ];

        const listBooked = await this.tripModel.aggregate(pipeline).exec();
        if (listBooked) {
            return listBooked;
        }
        return [];
    }
    public async booking(data: AddBookingDto): Promise<string> {
        if (isEmptyObject(data)) {
            throw new HttpException(400, "Model is empty");
        }

        if (!data.customer!._id || data.customer!._id == "") {
            let check_customer = await this.customerModel.findOne({
                "$or": [
                    { phonenumber: data.customer!.phonenumber },
                    { email: data.customer!.email },
                ],
            });
            // console.log(check_customer);
            if (!check_customer) {
                const customer_created = await this.customerModel.create({
                    name: data.customer!.name,
                    phonenumber: data.customer!.phonenumber,
                    email: data.customer!.email,
                    // name: data.customer!.name ,
                });
                data!.customer = customer_created as ICustomer;
                // console.log(data);
            } else {
                data!.customer = check_customer as ICustomer;
            }
            // else {
            //     throw new HttpException(409, "Email đã tồn tại");
            // }
        }
        const query = {
            journey_date: data.journey_date,
            trip_id: data.trip_id,
        };
        const listBooked = await this.bookingModel.find(query).exec();
        let listBookedSeat: Array<string> = [];
        await listBooked.forEach((book) => {
            listBookedSeat.push(book.seat);
        });
        const selectedSeats: Array<string> = data.selected_seats!.split("-");
        const commonSeat = await listBookedSeat.filter((x) =>
            selectedSeats.includes(x)
        );

        if (commonSeat.length > 0) {
            throw new HttpException(
                409,
                `Ghế số ${commonSeat.join(", ")} đã được đặt`
            );
        } else {
            const documents = [];
            const list_ticket: Array<String> = [];
            for (let seat of selectedSeats) {
                const newObject = { ...data } as Record<string, any>;
                newObject.seat = seat;
                newObject.status = delete newObject.selected_seats;
                documents.push(newObject);
            }
            const bookingDetail = await this.bookingModel.create(documents);
            bookingDetail.forEach((item) => {
                list_ticket.push(item._id as String);
            });
            if (data.is_payment_online) {
                const paymentData = await this.paymentModel.create({
                    trip_id: data.trip_id,
                    customer_id: data!.customer?._id,
                    list_ticket: list_ticket,
                    payment_amount: data.fare,
                    payment_code: "",
                    payment_status: "Processing",
                });
                return paymentData._id;
            } else {
                return "success";
            }
        }
    }
}
export default CoachService;
