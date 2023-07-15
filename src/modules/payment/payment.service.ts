import { Location, ILocation } from "@modules/location";
import { isEmptyObject } from "@core/utils/helper";
import { HttpException } from "@core/exceptions";
import { IPagination, NameValue } from "@core/interfaces";
import Payment from "./payment.model";

import { Logger, sortObject } from "@core/utils";
import querystring from "qs";
import crypto from "crypto";
import { CheckSumDTO } from "./dto";
import { Booking } from "@modules/book";
// import ILineDetail from "./interfaces/carDetail.interface";

class PaymentService {
    public paymentModel = Payment;
    public bookingModel = Booking;
    public async checkSum(data: CheckSumDTO): Promise<any> {
        if (isEmptyObject(data)) {
            throw new HttpException(400, "Model is empty");
        }
        let vnp_Params: Record<string, any> = { ...data };
        let secureHash = vnp_Params["vnp_SecureHash"];
        delete vnp_Params["vnp_SecureHash"];
        delete vnp_Params["vnp_SecureHashType"];
        vnp_Params = sortObject(vnp_Params);
        let secretKey = process.env.vnp_HashSecret;
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac(
            process.env.vnp_SecureHashType!,
            secretKey!
        );
        console.log(signData);
        let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
        let amount = data.vnp_Amount;
        let orderInfo = data.vnp_OrderInfo;
        let payment_id = orderInfo
            ?.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
            .split("Thanh toán vé ")[1];
        let rspCode = vnp_Params["vnp_ResponseCode"];
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
