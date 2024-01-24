const Controller = require('./Controller.js');
const PessoaServices = require('../services/PessoaServices.js');

const pessoaService = new PessoaServices();

class PessoaController extends Controller {
  constructor(){
    super(pessoaService);
  }
}

module.exports = PessoaController;