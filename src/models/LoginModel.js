const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const LoginSchema = new mongoose.Schema({
  email: { type: "string", required: true },
  password: { type: "string", required: true },
});

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    this.valida();
    if (this.errors.length > 0) return;
    this.user = await LoginModel.findOne({ email: this.body.email });

    if (!this.user) {
      this.errors.push("Usuário não existe.");
      return;
    }
    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push("Senha invalida");
      this.user = null;
      return;
    }
  }

  async register() {
    this.valida();
    if (this.errors.length > 0) return;

    await this.userExists();

    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await LoginModel.create(this.body);
  }

  async userExists() {
    this.user = await LoginModel.findOne({ email: this.body.email });

    if (this.user) {
      this.errors.push("Usuário já existe.");
    }
  }

  valida() {
    this.cleanUp();
    if (!validator.isEmail(this.body.email))
      this.errors.push("Esse E-mail não é valido");

    if (this.body.password.length < 4 || this.body.password.length > 12) {
      this.errors.push("A senha precisa ter entre 4 a 12 caracters");
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }
}
module.exports = Login;
