import validator from "validator";

export default class Login {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(e) {
    const el = e.target;
    const emailInput = el.querySelector("input[name='email']");
    const passwordInput = el.querySelector("input[name='password']");
    let error = false;

    if (!validator.isEmail(emailInput.value)) {
      alert("Please enter a valid email");
      error = true;
    }

    if (passwordInput.value.length < 4 || passwordInput.value.length > 12) {
      alert("Password must be at least 12 characters");
      error = true;
    }

    if (!error) el.submit();
  }
}
