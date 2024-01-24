const dataSource = require('../models');
//dentro de models, tem um index.js, que é o chamado aqui; ele gerencia todos os models

class Services {
  constructor(nomeDoModel){
    this.model = nomeDoModel;
  }

  async pegaTodosOsRegistros(){
    return dataSource[this.model].findAll();
  }
}

module.exports = Services;