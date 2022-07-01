require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose
  .connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.emit("pronto");
  })
  .catch((e) => console.log(e));
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const routes = require("./routes");
const path = require("path");
const helmet = require("helmet");
const csrf = require("csurf");
const {
  middlewareGlobal,
  checkCsrfError,
  csrfMiddleware,
} = require("./src/middlewares/middleware");

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.static(path.join(__dirname, "frontend/public/assets/img")));

const sessionOptions = session({
  secret: "wsqdqwdwdwdqd dqwdqwdqdqwd  qwdqwdqwwq()",
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true },
});
app.use(sessionOptions);
app.use(flash());

app.set("views", path.resolve(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use(csrf());
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on("pronto", () =>
  app.listen(3000, () => {
    console.log("Servidor executando na porta 3000");
  })
);