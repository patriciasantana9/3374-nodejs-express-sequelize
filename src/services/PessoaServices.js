const Services = require('./Services.js');

class PessoaServices extends Services {
  constructor(){
    super('Pessoa'); //Pessoa faz o papel de database.findAll()
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

}

module.exports = PessoaServices;