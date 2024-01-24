const Services = require('./Services.js');

class PessoaServices extends Services {
  constructor(){
    super('Pessoa'); //Pessoa faz o papel de database.findAll()
  }
}

module.exports = PessoaServices;