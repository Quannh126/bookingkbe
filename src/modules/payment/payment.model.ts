import mongoose, { Schema, model } from "mongoose";
export interface IPayment {
    _id?: string;
    trip_id: string;
    customer_id: string;
    list_ticket: [string];
    payment_status: string;
    payment_code: string;
    payment_detail: Object;
    payment_amount: string;
}
export interface IPaymentDetail {
    vnp_Amount: string;
    vnp_BankCode: string;
    vnp_BankTranNo: string;
    vnp_CardType: string;
    vnp_OrderInfo: string;
    vnp_PayDate: string;
    vnp_ResponseCode: string;
    vnp_TmnCode: string;
    vnp_TransactionNo: string;
    vnp_TransactionStatus: string;
    vnp_TxnRef: string;
    vnp_SecureHash: string;
}
const PaymentDetailSchema = new Schema<IPaymentDetail>({
    vnp_Amount: {
        type: String,
    },
    vnp_BankCode: {
        type: String,
    },
    vnp_BankTranNo: {
        type: String,
    },
    vnp_CardType: {
        type: String,
    },
    vnp_OrderInfo: {
        type: String,
    },
    vnp_PayDate: {
        type: String,
    },
    vnp_ResponseCode: {
        type: String,
    },
    vnp_TmnCode: {
        type: String,
    },
    vnp_TransactionNo: {
        type: String,
    },
    vnp_TransactionStatus: {
        type: String,
    },
    vnp_TxnRef: {
        type: String,
    },
    vnp_SecureHash: {
        type: String,
    },
});
const PaymentSchema = new Schema<IPayment & mongoose.Document>(
    {
        trip_id: {
            type: String,
            required: true,
        },
        customer_id: {
            type: String,
            require: true,
        },
        list_ticket: {
            type: [String],
            default: [],
        },
        payment_amount: {
            type: String,
        },
        payment_status: {
            type: String,
        },
        payment_detail: {
            type: PaymentDetailSchema,
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "update_at" } }
);
const Payment = model<IPayment & mongoose.Document>("Payments", PaymentSchema);
export default Payment;
