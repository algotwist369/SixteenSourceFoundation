const BankTransfer = require("../models/bankTransfer");

const uploadQrCode = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "QR code image is required" });
        }
        const filePath = `uploads/banckQR/${req.file.filename}`;
        return res.status(201).json({ success: true, qrCodeImage: filePath });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getAllBankTransfers = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const items = await BankTransfer.find().skip(skip).limit(limit).sort({ createdAt: -1 });
        const total = await BankTransfer.countDocuments();

        return res.status(200).json({ success: true, total, page, totalPages: Math.ceil(total / limit), limit, data: items });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

const createBankTransfer = async (req, res) => {
    try {
        const { accoountHolderName, accountType, branch, bankName, accountNumber, ifscCode, upiId, qrCodeImage } = req.body;
        if (!bankName || !accountNumber) {
            return res.status(400).json({ success: false, message: "Bank name and account number are required" });
        }
        const created = await BankTransfer.create({ accoountHolderName, accountType, branch, bankName, accountNumber, ifscCode, upiId, qrCodeImage });
        return res.status(201).json({ success: true, message: "Bank transfer created", data: created });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getBankTransferById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid bank transfer ID" });
        }
        const item = await BankTransfer.findById(id);
        if (!item) return res.status(404).json({ success: false, message: "Bank transfer not found" });
        return res.status(200).json({ success: true, data: item });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

const updateBankTransfer = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid bank transfer ID" });
        }
        const updated = await BankTransfer.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ success: false, message: "Bank transfer not found" });
        return res.status(200).json({ success: true, message: "Bank transfer updated", data: updated });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

const deleteBankTransfer = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid bank transfer ID" });
        }
        const deleted = await BankTransfer.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ success: false, message: "Bank transfer not found" });
        return res.status(200).json({ success: true, message: "Bank transfer deleted" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = { uploadQrCode, getAllBankTransfers, createBankTransfer, getBankTransferById, updateBankTransfer, deleteBankTransfer };
