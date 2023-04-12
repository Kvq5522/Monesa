const mongoose = require('mongoose');
const transactions = requires('./Transaction.model');

const statisticSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "Transactions of " + new String(new Date().getMonth() + 1) + "-" + new String(new Date().getFullYear())
    },
    outcome: {
        type: Number,
        default: 0
    },
    outcomeTransaction: [transactions.transactionSchema],
    income: {
        type: Number,
        default: 0
    },
    incomeTransaction: [transactions.transactionSchema],
    balance: Number
});

const Statistic = new mongoose.model('Statistic', statisticSchema);

module.exports = {
    statisticSchema,
    Statistic
}