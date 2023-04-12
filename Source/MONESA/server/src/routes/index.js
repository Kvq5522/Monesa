const submitRoute = require("./submit.route");
const loginRoute = require("./login.route");
const registerRoute = require("./register.route");
const siteRoute = require("./site.route");
const serviceRoute = require("./service.router");
const forgotPasswordRoute = require("./forgotpassword.route");
const dataRouter = require("./data.router");

function route(app) {
    //todo submit
    app.use("/", siteRoute);
    app.use("/auth", serviceRoute);
    app.use("/submit", submitRoute);
    app.use("/login", loginRoute);
    app.use("/register", registerRoute);
    app.use("/forgotpassword", forgotPasswordRoute);
    app.use("/dataAPI", dataRouter);
};

module.exports = route;

