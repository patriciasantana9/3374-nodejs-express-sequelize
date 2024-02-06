const dataSource = require('../database/models'); /* será usado o index.js da pasta */
const Services = require('./Services.js');

class PessoaServices extends Services {
  constructor(){
    super('Pessoa'); //Pessoa faz o papel de database.findAll()
    this.matriculaServices = new Services('Matricula'); /**recuperar os modelos de Matricula */
  }
  //método exclusivo de PessoaServices, que irá pegar as matrículas de acordo com o id do estudante
  //o id é recebido do controller
  async pegaMatriculasAtivasPorEstudante(id){
    //usar o método herdado da super e passar o id do estudante desejado
    const estudante = await super.pegaUmRegistroPorId(id);
    //depois pegar do resultado em getAulasMatriculadas()
    const listaMatriculas = await estudante.getAulasMatriculadas();
    //retornar o valor da lista
    return listaMatriculas;
  }

  async pegaTodasAsMatriculasPorEstudante(id){
    const estudante = await super.pegaUmRegistroPorId(id);
    const listaMatriculas = await estudante.getTodasAsMatriculas(); /**esse TodasAsMatriculas é o nome que tá no escopo no model */
    return listaMatriculas;
  }

  async pegaPessoasEscopoTodos(){
    //pegaRegistrosPorEscopo('todosOsRegistros') vem da classe super, Services
    const listaPessoas = await super.pegaRegistrosPorEscopo('todosOsRegistros');
    return listaPessoas;
  }

  async cancelaPessoaEMatriculas(estudante_id){
    return dataSource.sequelize.transaction(async (transacao) => {
      //                            o que será atualizado, onde será atualizado
      await super.atualizaRegistro({ ativo: false }, { id: estudante_id }, transacao);
      await this.matriculaServices.atualizaRegistro({ status: 'cancelado'}, {estudante_id: estudante_id}, transacao);
    });
  }
}

module.exports = PessoaServices;