const mongoose = require("mongoose");

const bankTransferSchema = new mongoose.Schema({
    accoountHolderName: String,
    accountType: String,
    branch: String,
    bankName: String,
    accountNumber: Number,
    ifscCode: String,
    upiId: String,
    qrCodeImage: String,
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
})

module.exports = mongoose.model("BankTransfer", bankTransferSchema);