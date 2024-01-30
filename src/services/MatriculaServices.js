const Services = require('./Services.js');

class MatriculaServices extends Services {
  constructor(){
    super('Matricula'); //Categoria faz o papel de database.findAll()
  }
}

module.exports = MatriculaServices;