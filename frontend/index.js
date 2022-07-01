import "core-js/stable";
import "regenerator-runtime";

import Login from "./modules/Login";
import Contato from "./modules/Contato";

const login = new Login(".form-login");
const cadastro = new Login(".form-cadastro");
const contato = new Contato(".formContato");
login.init();
cadastro.init();
contato.init();
