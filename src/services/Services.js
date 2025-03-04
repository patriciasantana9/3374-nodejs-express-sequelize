const dataSource = require('../database/models');
//dentro de models, tem um index.js, que é o chamado aqui; ele gerencia todos os models; métodos que se conectam com o banco

class Services {
  constructor(nomeDoModel){
    this.model = nomeDoModel;
  }

  async pegaTodosOsRegistros(where = {}){
    return dataSource[this.model].findAll({ where: {...where} });
  }

  //esse método poga o escopo enviado por parâmetro; pode servir para qualquer escopo, qualquer modelo
  async pegaRegistrosPorEscopo(escopo) {
    return dataSource[this.model].scope(escopo).findAll();
  }

  async pegaUmRegistroPorId(id) {
    return dataSource[this.model].findByPk(id);
  }

  async pegaUmRegistro(where) { /**receberá um valor e ele será espalhado dentro do valor da propriedade where (de /matricula/id) */
    return dataSource[this.model].findOne({ where: {...where} });
  }

  //contar quantidade de matrículas por estudante
  async pegaEContaRegistros(options) {
    return dataSource[this.model].findAndCountAll({ ...options });
  }

  async criaRegistro(dadosDoRegistro) {
    return dataSource[this.model].create(dadosDoRegistro);
  }

  //o parametro transacao é opcional
  async atualizaRegistro(dadosAtualizados, where, transacao = {}){
    const listadeRegistroAtualizado = await dataSource[this.model].update(dadosAtualizados, {
      where: { ...where }, /**será usado where para ficar mais genérico */
      transaction: transacao
    });

    if(listadeRegistroAtualizado[0] === 0) {
      return false;
    }
    return true;
  }

  async excluiRegistro(where) {
    return dataSource[this.model].destroy({ where: { ...where } });
  }
}

module.exports = Services;