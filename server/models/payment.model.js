import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide a user."]
    },
    paymentID: {
        type: String,
        required: [true, "Please provide a payment ID."]
    },
    paymentMethod: {
        type: String,
        required: [true, "Please provide a payment method."],
        enum: ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer', 'UPI', 'Others']
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    },
    currency: {
        type: String,
        required: true,
        enum: ['USD', 'EUR', 'INR', 'GBP', 'AUD', 'CAD', 'SGD', 'Others'] 
      },
      transactionId: {
        type: String,
        required: [true, "Please provide a transaction ID."],
        unique: [true, "Transaction ID already exists."]
      },
}, {timestamps: true});


const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;