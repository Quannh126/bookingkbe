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
import { v4 as uuidv4 } from "uuid";
// import ICarDetail from "./interfaces/carDetail.interface";

class CoachService {
    public bookingModel = Booking;
    public tripModel = Trip;
    public customerModel = Customer;
    public paymentModel = Payment;
    public async getSearchBooking(
        journey_date: string,
        startLocation: string,
        endLocation: string,
        times: string,
        gn: string,
        gt: string,
        available_seat: string
    ): Promise<Array<IBookingTrip>> {
        if (!journey_date) {
            throw new HttpException(400, "Query error");
        }
        let from_id, to_id, dropoff_point: string, pickup_point: string;

        pickup_point = !startLocation
            ? ""
            : startLocation.split("-")[1] + "-" + startLocation.split("-")[2];
        dropoff_point = !endLocation
            ? ""
            : endLocation.split("-")[1] + "-" + endLocation.split("-")[2];
        from_id = !startLocation
            ? { "$exists": true }
            : startLocation.split("-")[0];
        to_id = !endLocation ? { "$exists": true } : endLocation.split("-")[0];
        // Kiểu xe
        let type_car;
        if (gn == "true" && gt == "false") {
            type_car = "Giường nằm";
        } else if (gn == "false" && gt == "true") {
            type_car = "Ghế thường";
        } else {
            type_car = "";
        }
        const tc = !type_car ? { "$exists": true } : type_car;

        //Thời gian
        let query;
        if (times === "") {
            query = [{}];
        } else {
            const timeRanges = times.split(",");
            const orConditions = timeRanges.map((range) => {
                const [start, end] = range.split("-");
                return {
                    "$expr": {
                        "$and": [
                            {
                                "$gte": [
                                    { "$substr": ["$departure_time", 0, 5] },
                                    start,
                                ],
                            },
                            {
                                "$lt": [
                                    { "$substr": ["$departure_time", 0, 5] },
                                    end,
                                ],
                            },
                        ],
                    },
                };
            });
            query = orConditions;
        }
        let av = "0";
        if (!available_seat || available_seat === "") {
            av = "0";
        } else {
            av = available_seat;
        }
        // console.log(available_seat);
        const startTime =
            !times || times === "" ? "00:00" : times.split("-")[0];
        const endTime = !times || times === "" ? "23:59" : times.split("-")[1];
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
                    "available_seat": {
                        "$cond": [
                            {
                                "$eq": ["$bookings", []],
                            },
                            "$capacity",
                            {
                                "$let": {
                                    "vars": {
                                        "seatsBooked": {
                                            "$size": "$bookings",
                                        },
                                    },
                                    "in": {
                                        "$subtract": [
                                            { "$toInt": "$capacity" },
                                            "$$seatsBooked",
                                        ],
                                    },
                                },
                            },
                        ],
                    },
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
                "$addFields": {
                    "available_seat_int": { "$toInt": "$available_seat" },
                },
            },
            {
                "$match": {
                    "from_id": from_id,
                    "to_id": to_id,
                    "dropoff_point.district_id": dd,
                    "dropoff_point.point_id": dp,
                    "pickup_point.district_id": pd,
                    "pickup_point.point_id": pp,
                    "car.type_car": tc,
                    "available_seat_int": {
                        "$gte": parseInt(av!),
                    },
                    "$or": query,
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
                phonenumber: data.customer!.phonenumber,
            });
            // console.log(check_customer);
            if (!check_customer) {
                const customer_created = await this.customerModel.create({
                    name: data.customer!.name,
                    phonenumber: data.customer!.phonenumber,
                    email: data.customer!.email,
                    // name: data.customer!.name ,
                    times_booking: 1,
                });
                data!.customer = customer_created as ICustomer;
                // console.log(data);
            } else {
                data!.customer = check_customer as ICustomer;
            }
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
            const ticket_code = uuidv4();
            data!.customer = {
                ...data!.customer,
                times_booking: data!.customer!.times_booking
                    ? 1
                    : data!.customer!.times_booking + 1,
            } as ICustomer;
            for (let seat of selectedSeats) {
                const newObject = {
                    ...data,
                    ticket_code: ticket_code,
                } as Record<string, any>;
                newObject.seat = seat;
                delete newObject.selected_seats;

                documents.push(newObject);
            }
            const bookingDetail = await this.bookingModel.create(documents);
            bookingDetail.forEach((item) => {
                list_ticket.push(item._id as String);
            });

            const paymentData = await this.paymentModel.create({
                trip_id: data.trip_id,
                customer_id: data!.customer?._id,
                list_ticket: list_ticket,
                payment_amount: data.fare,
                payment_code: "",
                payment_status: "Processing",
            });
            return paymentData._id;
        }
    }
}
export default CoachService;
