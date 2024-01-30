const Services = require('./Services.js');

class CursoServices extends Services {
  constructor(){
    super('Curso'); //Categoria faz o papel de database.findAll()
  }
}

module.exports = CursoServices;