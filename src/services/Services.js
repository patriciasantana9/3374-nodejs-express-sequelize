const dataSource = require('../database/models');
//dentro de models, tem um index.js, que é o chamado aqui; ele gerencia todos os models; métodos que se conectam com o banco

class Services {
  constructor(nomeDoModel){
    this.model = nomeDoModel;
  }

  async pegaTodosOsRegistros(){
    return dataSource[this.model].findAll();
  }

  async pegaUmRegistroPorId(id) {
    return dataSource[this.model].findByPk(id);
  }

  async criaRegistro(dadosDoRegistro) {
    return dataSource[this.model].create(dadosDoRegistro);
  }

  async atualizaRegistro(dadosAtualizados, id){
    const listadeRegistroAtualizado = dataSource[this.model].update(dadosAtualizados, {
      where: { id: id } /* pode ser { id } apenas */
    });

    if(listadeRegistroAtualizado[0] === 0) {
      return false;
    }
    return true;
  }

  async excluiRegistro(id) {
    return dataSource[this.model].destroy({ where: { id: id } });
  }
}

module.exports = Services;