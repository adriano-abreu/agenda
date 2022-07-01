import validator from "validator";

export default class {
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
    const nomeImput = el.querySelector("input[name='nome']");
    const sobrenomeImput = el.querySelector("input[name='sobrenome']");
    const emailInput = el.querySelector("input[name='email']");
    const telefoneInput = el.querySelector("input[name='telefone']");
    let error = false;

    for (let errorText of this.form.querySelectorAll(".text-danger")) {
      errorText.remove();
    }

    if (!nomeImput.value.trim().length) {
      const label = el.querySelector("label[name='label-nome']");
      this.createErro(label, "O campo nome não pode estar vazio");
      error = true;
    }

    if (!sobrenomeImput.value.trim().length) {
      const label = el.querySelector("label[name='label-sobrenome']");
      this.createErro(label, "O campo sobrenome não pode estar vazio");
      error = true;
    }

    if (!validator.isEmail(emailInput.value)) {
      const label = el.querySelector("label[name='label-email']");
      this.createErro(label, "O E-mail é inválido");
      error = true;
    }

    if (!telefoneInput.value.trim().length || !Number(telefoneInput.value)) {
      const label = el.querySelector("label[name='label-telefone']");
      this.createErro(label, "O telefone é inválido");
      error = true;
    }

    if (!error) el.submit();
  }
  createErro(el, msg) {
    const div = document.createElement("div");
    div.innerHTML = msg;
    div.classList.add("text-danger");
    el.insertAdjacentElement("afterend", div);
  }
}
