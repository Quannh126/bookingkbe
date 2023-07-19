import { NextFunction, request, Request, response, Response } from "express";
import querystring from "qs";
import crypto from "crypto";
import moment from "moment";
import { sortObject } from "@core/utils";
import PaymentService from "./payment.service";
import { CheckSumDTO } from "./dto";

export default class PaymentController {
    private paymentService = new PaymentService();
    public createPaymentURL = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const date = new Date();
            const createDate = moment(date).format("YYYYMMDDHHmmss");

            // let ipAddr = "127.0.0.1";
            const ipAddr =
                req.headers["x-forwarded-for"] ||
                // req.connection.remoteAddress ||
                req.socket.remoteAddress;

            // console.log("ipAddr", ipAddr);
            const tmnCode = process.env.vnp_TmnCode;
            const secretKey = process.env.vnp_HashSecret;
            let vnpUrl = process.env.vnp_Url;
            const returnUrl = process.env.vnp_ReturnUrl;
            const orderId = moment(date).format("DDHHmmss");
            const amount = req.body.amount;
            const bankCode = req.body.bankCode;
            const orderInfo = req.body.orderInfo;

            const currCode = "VND";
            let vnp_Params: Record<string, any> = {};
            vnp_Params["vnp_Version"] = "2.1.0";
            vnp_Params["vnp_Command"] = "pay";
            vnp_Params["vnp_TmnCode"] = tmnCode;
            vnp_Params["vnp_Locale"] = "vn";
            vnp_Params["vnp_CurrCode"] = currCode;
            vnp_Params["vnp_TxnRef"] = orderId;
            vnp_Params["vnp_OrderInfo"] = orderInfo;
            vnp_Params["vnp_OrderType"] = "other";
            vnp_Params["vnp_Amount"] = amount * 100;
            vnp_Params["vnp_ReturnUrl"] = returnUrl;
            vnp_Params["vnp_IpAddr"] = ipAddr;
            vnp_Params["vnp_CreateDate"] = createDate;
            if (bankCode !== null && bankCode !== "") {
                vnp_Params["vnp_BankCode"] = bankCode;
            }

            vnp_Params = sortObject(vnp_Params);
            const signData = querystring.stringify(vnp_Params, { encode: false });
            const hmac = crypto.createHmac(
                process.env.vnp_SecureHashType!,
                secretKey!
            );
            console.log(signData);
            const signed = hmac
                .update(Buffer.from(signData, "utf-8"))
                .digest("hex");
            vnp_Params["vnp_SecureHash"] = signed;
            vnpUrl +=
                "?" + querystring.stringify(vnp_Params, { encode: false });
            res.json(vnpUrl!);
        } catch (error) {
            next(error);
        }
    };

    public checkSum = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const vnp_Amount = req.query.vnp_Amount as string;
            const vnp_BankCode = req.query.vnp_BankCode as string;
            const vnp_BankTranNo = req.query.vnp_BankTranNo as string;
            const vnp_CardType = req.query.vnp_CardType as string;
            const vnp_OrderInfo = req.query.vnp_OrderInfo as string;
            const vnp_PayDate = req.query.vnp_PayDate as string;
            const vnp_ResponseCode = req.query.vnp_ResponseCode as string;
            const vnp_SecureHash = req.query.vnp_SecureHash as string;
            const vnp_TmnCode = req.query.vnp_TmnCode as string;
            const vnp_TransactionNo = req.query.vnp_TransactionNo as string;
            const vnp_TransactionStatus = req.query
                .vnp_TransactionStatus as string;
            const vnp_TxnRef = req.query.vnp_TxnRef as string;
            const vnp_Params = {
                vnp_Amount,
                vnp_BankCode,
                vnp_BankTranNo,
                vnp_CardType,
                vnp_OrderInfo,
                vnp_PayDate,
                vnp_ResponseCode,
                vnp_SecureHash,
                vnp_TmnCode,
                vnp_TransactionNo,
                vnp_TransactionStatus,
                vnp_TxnRef,
            };
            const result = await this.paymentService.checkSum(vnp_Params);
            res.json(result);
        } catch (error) {
            next(error);
        }
    };
}
