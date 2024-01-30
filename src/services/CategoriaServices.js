const Services = require('./Services.js');

class CategoriaServices extends Services {
  constructor(){
    super('Categoria'); //Categoria faz o papel de database.findAll()
  }
}

module.exports = CategoriaServices;