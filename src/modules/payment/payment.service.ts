import { Location, ILocation } from "@modules/location";
import { isEmptyObject } from "@core/utils/helper";
import { HttpException } from "@core/exceptions";
import { IPagination, NameValue } from "@core/interfaces";
import Payment from "./payment.model";
import sendMail from "@core/utils/sendmail"
import genarateEmail from "@core/utils/generateEmail"
import { Logger, sortObject } from "@core/utils";
import querystring from "qs";
import crypto from "crypto";
import { CheckSumDTO } from "./dto";
import { Booking } from "@modules/book";
import { Trip } from "@modules/trips";
// import ILineDetail from "./interfaces/carDetail.interface";
import moment from "moment";
class PaymentService {
    public paymentModel = Payment;
    public bookingModel = Booking;
    public tripModel = Trip;
    public locationModel = Location;
    public async checkSum(data: CheckSumDTO): Promise<any> {
        if (isEmptyObject(data)) {
            throw new HttpException(400, "Model is empty");
        }
        let vnp_Params: Record<string, any> = { ...data };
        const secureHash = vnp_Params["vnp_SecureHash"];
        delete vnp_Params["vnp_SecureHash"];
        delete vnp_Params["vnp_SecureHashType"];
        vnp_Params = sortObject(vnp_Params);
        const secretKey = process.env.vnp_HashSecret;
        const signData = querystring.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac(
            process.env.vnp_SecureHashType!,
            secretKey!
        );
        // console.log(signData);
        const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
        const amount = data.vnp_Amount;
        const orderInfo = data.vnp_OrderInfo;
        const payment_id = orderInfo
            ?.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
            .split("Thanh toán vé ")[1];
        const rspCode = vnp_Params["vnp_ResponseCode"];
        let result_service = { message: "", code: "" };
        const dataPayment = await this.paymentModel
            .findById({ _id: payment_id })
            .exec();

        if (secureHash === signed) {
            if (dataPayment) {
                if (
                    parseFloat(data.vnp_Amount!) / 100 ===
                    parseFloat(dataPayment.payment_amount)
                ) {
                    if (dataPayment.payment_status === "Processing") {
                        if (rspCode == "00") {
                            await this.paymentModel
                                .findByIdAndUpdate(
                                    { _id: payment_id },
                                    {
                                        $set: {
                                            payment_status: "Payment_Success",

                                            payment_detail: {
                                                ...dataPayment!.payment_detail,
                                                ...data,
                                            },
                                        },
                                    }
                                )
                                .exec()
                                .catch((err) => {
                                    throw new HttpException(
                                        400,
                                        "Error when update"
                                    );
                                });
                            const list_ticket = dataPayment.list_ticket;
                            await this.bookingModel
                                .updateMany(
                                    { _id: { $in: list_ticket } },
                                    {
                                        $set: {
                                            status_ticket: "Paid",
                                            status_payment: "paid",
                                        },
                                    }
                                )
                                .exec();
                            const listBooking = await this.bookingModel.find({ _id: { $in: list_ticket } })

                            const ticketDetail = listBooking[0];
                            const listSeat = listBooking.map(book => {
                                return book.seat
                            })
                            const listSeatStr = "Số " + listSeat.join(', ')
                            const pickup_code = ticketDetail?.pickup_point;
                            const dropoff_code = ticketDetail?.dropoff_point;

                            const tripInfo = await this.tripModel.findById({ _id: ticketDetail?.trip_id! }).exec();
                            const startLocation = await this.locationModel.findOne({ code: tripInfo?.from_id });
                            const finishLocation = await this.locationModel.findOne({ code: tripInfo?.to_id });
                            const strPickup = startLocation?.district[parseInt(pickup_code!.split("-")[0]) - 1].point[parseInt(pickup_code!.split("-")[1]) - 1].address;
                            const strDropoff = finishLocation?.district[parseInt(dropoff_code!.split("-")[0]) - 1].point[parseInt(dropoff_code!.split("-")[1]) - 1].address;
                            await sendMail.sendMail(ticketDetail?.customer.email ?? "quankidz96@gmail.com", "[Bao Yen] Thông báo thanh toán vé xe thành công", await genarateEmail({
                                name: ticketDetail?.customer.name!,
                                pickup: strPickup ?? "Hà Nội",
                                dropoff: strDropoff ?? "Tuyên Quang",
                                start_time: tripInfo?.departure_time ?? "10:30",
                                seat: listSeatStr,
                                ticket_code: ticketDetail?.ticket_code ?? "",
                                payment_code: data.vnp_TransactionNo ?? "VNP123124",
                                amount: (parseFloat(amount!) / 100).toLocaleString() + " VND",
                                journey_date: moment(ticketDetail?.journey_date).format("DD-MM-YYYY") as string,
                            }));
                            return (result_service = {
                                message: "success",
                                code: rspCode,
                            });
                        } else {
                            result_service = {
                                message: "success",
                                code: rspCode,
                            };
                        }
                    } else {
                        result_service = {
                            message:
                                "This order has been updated to the payment status",
                            code: "02",
                        };
                    }
                } else {
                    result_service = {
                        message: "Amount invalid",
                        code: "04",
                    };
                }
            } else {
                result_service = { code: "01", message: "Order not found" };
            }
        } else {
            result_service = { message: "Checksum failed", code: "97" };
        }

        if (result_service.code !== "02") {
            const res = await this.paymentModel
                .findByIdAndUpdate(
                    { _id: payment_id },
                    {
                        $set: {
                            payment_status: "Payment_Failed",

                            payment_detail: {
                                ...dataPayment!.payment_detail,
                                ...data,
                            },
                        },
                    }
                )
                .exec()
                .catch((err) => {
                    throw new HttpException(400, "Error when update");
                });
        }

        return result_service;
    }
}

export default PaymentService;
