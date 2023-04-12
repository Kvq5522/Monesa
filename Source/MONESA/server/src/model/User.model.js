const mongoose = require("mongoose");
const passportLocalMongo = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");      // cung cap ham findorcreat vi trong mongoose ko co ham do
const workspace = require('./Workspace.model');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    displayName: String,
    defaultWorkspace: workspace.workspaceSchema
});

userSchema.plugin(passportLocalMongo);   // them plugin nay vo de co the giup salt va hashing ket hop voi cookie
userSchema.plugin(findOrCreate);

module.exports = new mongoose.model("users", userSchema);