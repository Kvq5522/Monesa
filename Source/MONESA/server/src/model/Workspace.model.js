const mongoose = require('mongoose')
const transactions = require('./Transaction.model')

const workspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "Personal Workspace"
    },
    owner: String,
    currency: {
        type: String,
        default: "VND"
    },
    transactions: [transactions.transactionSchema],
    wallet: [{
        name: String,
        value: String,
    }]
});

const Workspace = new mongoose.model('Workspace', workspaceSchema);

module.exports = {
    workspaceSchema,
    Workspace
}