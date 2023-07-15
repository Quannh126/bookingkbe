import { isEmptyObject } from "@core/utils/helper";
import { HttpException } from "@core/exceptions";
import { IPagination, NameValue } from "@core/interfaces";
import Booking from "./book.model";
import AddBookingDto from "./dto/add_booking.dto";
import IBooking from "./interfaces/book.interface";
import IBookingTrip from "./interfaces/booking-trip.interface";
import { Trip } from "@modules/trips";
import { Customer, ICustomer } from "@modules/customer";
import SwapSeatDTO from "./dto/seat_swap.dto";

// import ICarDetail from "./interfaces/carDetail.interface";

class BookingService {
    public bookingModel = Booking;
    public tripModel = Trip;
    public customerModel = Customer;
    public async booking(data: AddBookingDto): Promise<void> {
        if (isEmptyObject(data)) {
            throw new HttpException(400, "Model is empty");
        }

        if (!data.customer!._id || data.customer!._id == "") {
            let check_customer = await this.customerModel.find({
                "$or": [
                    { phonenumber: data.customer!.phonenumber },
                    { email: data.customer!.email },
                ],
            });
            // console.log(check_customer);
            if (!check_customer || check_customer.length == 0) {
                const customer_created = await this.customerModel.create({
                    name: data.customer!.name,
                    phonenumber: data.customer!.phonenumber,
                    email: data.customer!.email,
                    // name: data.customer!.name ,
                });
                data!.customer = customer_created as ICustomer;
                console.log(data);
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
            for (let seat of selectedSeats) {
                const newObject = { ...data } as Record<string, any>;
                newObject.seat = seat;
                delete newObject.selected_seats;
                documents.push(newObject);
            }
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
                },
            },
        ];

        const listBooked = await this.tripModel.aggregate(pipeline).exec();
        if (listBooked) {
            return listBooked;
        }
        return [];
    }

    public async updateBooking(data: AddBookingDto): Promise<void> {
        if (isEmptyObject(data)) {
            throw new HttpException(400, "Model is empty");
        }

        const query = {
            journey_date: data.journey_date,
            trip_id: data.trip_id,
        };
        const listCustomerBooked = await this.bookingModel.find({
            journey_date: data.journey_date,
            "customer._id": data.customer?._id,
            trip_id: data.trip_id,
        });
        let listSeatCustomerBooked: Array<string> = [];
        await listCustomerBooked.forEach((book) => {
            listSeatCustomerBooked.push(book.seat);
        });
        const listBooked = await this.bookingModel.find(query).exec();
        let listBookedSeat: Array<string> = [];
        await listBooked.forEach((book) => {
            listBookedSeat.push(book.seat);
        });
        const selectedSeats: Array<string> = data.selected_seats!.split("-");
        const commonSeat = await listBookedSeat.filter(
            (x) =>
                selectedSeats.includes(x) && !listSeatCustomerBooked.includes(x)
        );

        if (commonSeat.length > 0) {
            throw new HttpException(
                409,
                `Ghế số ${commonSeat.join(", ")} đã được đặt`
            );
        } else {
            const listId = data.list_id!.split("-");
            const deleteBook = await this.bookingModel
                .deleteMany({ _id: { $in: listId } })
                .exec();
            const documents = [];
            for (let seat of selectedSeats) {
                const newObject = { ...data } as Record<string, any>;
                newObject.seat = seat;
                delete newObject.selected_seats;
                documents.push(newObject);
            }
            await this.bookingModel.create(documents);
        }
    }

    public async swapSeat(data: SwapSeatDTO): Promise<void> {
        if (isEmptyObject(data)) {
            throw new HttpException(400, "Data is empty");
        }
        // console.log(data);
        const { seat, booking_id } = data;
        let bookingData = await this.bookingModel.findById(booking_id).exec();
        // console.log(bookingData);
        if (!bookingData) {
            throw new HttpException(409, "Không tìm thấy chỗ đã chọn");
        }
        if (bookingData.seat == seat?.toString()) {
            throw new HttpException(409, "Xin hay chọn chỗ khác chỗ hiện tại");
        }
        bookingData.seat = data.seat!.toString();
        const newData = await this.bookingModel.findByIdAndUpdate(booking_id, {
            ...bookingData,
        });
        // console.log(newData);
    }

    public async removeBooking(
        trip_id: string,
        list_seat: string
    ): Promise<void> {
        if (!trip_id || !list_seat) {
            throw new HttpException(400, "Data is empty");
        }
        const list = await list_seat.split("-").map((item) => Number(item));
        const result = await this.bookingModel.deleteMany({
            trip_id: trip_id,
            seat: { $in: list },
        });
        if (!result) {
            throw new HttpException(409, "Lỗi không xoá được");
        }
    }
    public async destroyBooking(
        trip_id: string,
        list_seat: string
    ): Promise<void> {
        if (!trip_id || !list_seat) {
            throw new HttpException(400, "Data is empty");
        }
        const list = await list_seat.split("-").map((item) => Number(item));
        const result = await this.bookingModel.deleteMany({
            trip_id: trip_id,
            seat: { $in: list },
        });
        if (!result) {
            throw new HttpException(409, "Lỗi không xoá được");
        }
    }
}
export default BookingService;
