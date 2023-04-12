const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    name: String,
    type: String,
    amount: Number,
    date: Date
});

const Transaction = new mongoose.model('Transaction', transactionSchema);

module.exports = {
    transactionSchema,
    Transaction
}