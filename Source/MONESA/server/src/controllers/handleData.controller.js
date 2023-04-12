const User = require("../model/User.model");
const Transaction = require("../model/Transaction.model");

// POST "/dataAPI/data"
function dataPOST(req, res) {
    User.findById(req.body.id, (err, foundUser) => {
        if (err) {
            console.log(err);
            return res.status(401).json(err);
        }
        else {
            if (foundUser) {
                return res.status(200).json(foundUser);
            }
        }
    });
}
//todo notic3: sua lai cai type tai sao khong thay doi 
function addTransaction(req, res) {
    const idUser = req.body.idUser;
    console.log(req.body)
    data = req.body.transaction;
    User.findById(idUser, (err, foundUser) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ check: "ERROR" });
        } else {
            if (foundUser) {
                const temp = new Transaction.Transaction({
                    name: data.name,
                    type: data.type,
                    amount: data.amount,
                    date: data.date
                });
                foundUser.defaultWorkspace.transactions.push(temp);
                foundUser.save();
                return res.status(200).json({ check: "OK" });
            }
            else {
                return res.status(401).json({ check: "ERROR" });

            }
        }
    })
}

function deleteTransaction(req, res) {
    const idUser = req.body.idUser;
    const idTransection = req.body.idTransaction;

    User.findById(idUser, (err, foundUser) => {
        if (err) {
            console.log(err);
            res.redirect('/monesa');
        } else {
            if (foundUser) {
                var index = foundUser.defaultWorkspace.transactions.map(x => {
                    return x.id;
                }).indexOf(idTransection);
                console.log(index);
                foundUser.defaultWorkspace.transactions.splice(index, 1);
                foundUser.save();
                return res.status(200).json({ check: "OK" });
            }
            else {
                return res.status(401).json({ check: "ERROR" });

            }
        }
    })
}

//todo notic3: sua lai cai type tai sao khong thay doi va chinh lai cai navegate

function updateTransaction(req, res) {

    const idUser = req.body.idUser;
    const transactionID = req.body.transaction._id;
    const transactionName = req.body.transaction.name;
    const transactionValue = req.body.transaction.amount;
    const transactionType = req.body.transaction.type;
    const transactionDate = req.body.transaction.date;


    User.findById(idUser, (err, foundUser) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ check: "ERROR" });
        } else {
            if (foundUser) {
                let obj = foundUser.defaultWorkspace.transactions.find((key) => {
                    if (key._id == transactionID) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                })
                let index = foundUser.defaultWorkspace.transactions.indexOf(obj);

                foundUser.defaultWorkspace.transactions[index].name = transactionName;
                foundUser.defaultWorkspace.transactions[index].amount = transactionValue;
                foundUser.defaultWorkspace.transactions[index].type = transactionType;
                foundUser.defaultWorkspace.transactions[index].date = transactionDate
                foundUser.save();
                return res.status(200).json({ check: "OK" });
            }
            else {
                return res.status(401).json({ check: "ERROR" });
            }
        }
    })
}

module.exports = {
    dataPOST,
    addTransaction,
    deleteTransaction,
    updateTransaction
};