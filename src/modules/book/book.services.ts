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
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
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
            const check_customer = await this.customerModel.find({
                phonenumber: data.customer!.phonenumber,
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
                // console.log(data);//
            }
            // else {
            //     throw new HttpException(409, "Email đã tồn tại");
            // }
        }
        const query = {
            journey_date: data.journey_date,
            trip_id: data.trip_id,
            status_ticket: { "$not": { "$eq": "Cancelled" } },
        };
        const ticket_code = uuidv4();
        //KTra xem trùng chỗ nào k
        //ticket_code = ticket_code
        const listBooked = await this.bookingModel.find(query).exec();
        const listBookedSeat: Array<string> = [];
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
            // const list_ticket: Array<String> = [];
            // const ticket_code = uuidv4();
            data!.customer = {
                ...data!.customer,
                times_booking: data!.customer!.times_booking
                    ? 1
                    : data!.customer!.times_booking + 1,
            } as ICustomer;
            for (const seat of selectedSeats) {
                const newObject = {
                    ...data,
                    ticket_code: ticket_code,
                    status_ticket:
                        data.status_payment === "paid" ? "Paid" : "Reserved",
                } as Record<string, any>;
                newObject.seat = seat;
                delete newObject.selected_seats;
                documents.push(newObject);
            }
            await this.bookingModel.create(documents);
            // bookingDetail.forEach((item) => {
            //     list_ticket.push(item._id as String);
            // });
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
                    "trip_id": "$trip_id",
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
                    "status_ticket": "$status_ticket",
                    "ticket_code": "$ticket_code",
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
                    "status_ticket": "$status_ticket",
                    "ticket_code": "$ticket_code",
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
                    "status_ticket": "$status_ticket",
                    "ticket_code": "$ticket_code",
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
                                                "$size": {
                                                    "$filter": {
                                                        "input": "$bookings",
                                                        "as": "booking_f",
                                                        "cond": {
                                                            "$strcasecmp": [
                                                                "$$booking_f.status_ticket",
                                                                "Cancelled",
                                                            ],
                                                        },
                                                    },
                                                },
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
                                    // "input": "$bookings",
                                    "input": {
                                        "$filter": {
                                            "input": "$bookings",
                                            "as": "booking_f",
                                            "cond": {
                                                "$strcasecmp": [
                                                    "$$booking_f.status_ticket",
                                                    "Cancelled",
                                                ],
                                            },
                                        },
                                    },
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
        const ticket_code = uuidv4();
        const query = {
            journey_date: data.journey_date,
            trip_id: data.trip_id,
        };
        const listCustomerBooked = await this.bookingModel.find({
            journey_date: data.journey_date,
            "customer._id": data.customer?._id,
            trip_id: data.trip_id,
        });
        const listSeatCustomerBooked: Array<string> = [];
        await listCustomerBooked.forEach((book) => {
            listSeatCustomerBooked.push(book.seat);
        });
        const listBooked = await this.bookingModel.find(query).exec();
        const listBookedSeat: Array<string> = [];
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
            for (const seat of selectedSeats) {
                const newObject = {
                    ...data,
                    ticket_code: ticket_code,
                } as Record<string, any>;
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
        const bookingData = await this.bookingModel.findById(booking_id).exec();
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
        const result = await this.bookingModel.updateMany(
            {
                trip_id: trip_id,
                seat: { $in: list },
            },
            { "status_ticket": "Cancelled" }
        );
        if (!result) {
            throw new HttpException(409, "Lỗi không xoá được");
        }
    }

    public async getDonutData(): Promise<any> {
        // const currentDate = moment("10-08-2023").format("YYYY-MM-DD");
        const currentDate = "2023-08-10";
        console.log(currentDate);
        const listBookingCurrentDate = await this.bookingModel
            .find({ journey_date: currentDate })
            .exec();
        // eslint-disable-next-line prefer-const
        let listTicket: Array<any> = [];
        // eslint-disable-next-line prefer-const
        let listBooking: Array<any> = [];
        // eslint-disable-next-line prefer-const
        let result2: [number, number, number] = [0, 0, 0];

        listBookingCurrentDate.forEach((booking) => {
            // if (listTicket.indexOf(booking.ticket_code) < 0) {
            //     listTicket.push(booking.ticket_code);
            //     listBooking.push(booking);
            //     const newIndex = listTicket.length - 1;
            //     result[newIndex] = 1;
            //     // console.log(listTicket);
            // } else {
            //     const findTicket = listTicket.indexOf(ticket);
            //     result[findTicket] = result[findTicket] + 1;
            // }

            if (listTicket.indexOf(booking.ticket_code) < 0) {
                listTicket.push(booking.ticket_code);
                listBooking.push(booking);
                // console.log(listTicket);
            }
        });

        // console.log(listBooking);

        listBooking.forEach((booking) => {
            if (booking.status_ticket === "Reserved")
                result2[0] = result2[0] + 1;
            else if (booking.status_ticket === "Paid") result2[1]++;
            else result2[2]++;
        });

        return result2;
    }

    // public async getDataOfYear(year:number): Promise<any>{
    //     if(!year || year < 0){
    //         year =(new Date()).getFullYear();

    //     }
    //     console.log(year)
    //     const pipeline = [
    //         {
    //           "$match": {
    //             "status_ticket": "Paid", // Chỉ lấy các tài liệu có trạng thái "Paid"
    //           },
    //         },
    //         {
    //           "$group": {
    //             "_id": { "$month": { "$toDate": "$journey_date" } }, // Tổng hợp theo tháng (giá trị từ 1 đến 12)
    //             "totalFare": { "$sum": { "$toDouble": "$fare" } }, // Tính tổng fare cho từng tháng
    //           },
    //         },
    //         {
    //           "$sort": {
    //             "_id": 1,
    //           },
    //         },
    //       ];

    //      const result = await this.bookingModel.aggregate(pipeline)
    //         .then((result) => {
    //           const monthlyRevenue = Array(12).fill(0); // Khởi tạo mảng 12 phần tử với giá trị ban đầu là 0
    //           for (const item of result) {
    //             const monthIndex = item._id - 1; // Chuyển từ giá trị tháng (1 đến 12) thành chỉ số mảng (0 đến 11)
    //             monthlyRevenue[monthIndex] = item.totalFare;
    //           }
    //           console.log(monthlyRevenue); // Mảng gồm 12 phần tử đại diện cho doanh số thu được trong 1 năm
    //         })
    //         .catch((error) => {
    //           console.error("Error:", error);
    //         });
    //     return ''
    // }
}
export default BookingService;
