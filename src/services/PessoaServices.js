const Services = require('./Services.js');

class PessoaServices extends Services {
  constructor(){
    super('Pessoa'); //Pessoa faz o papel de database.findAll()
  }
  //método exclusivo de PessoaServices, que irá pegar as matrículas de acordo com o id do estudante
  //o id é recebido do controller
  async pegaMatriculasPorEstudante(id){
    //usar o método herdado da super e passar o id do estudante desejado
    const estudante = await super.pegaUmRegistroPorId(id);
    //depois pegar do resultado em getAulasMatriculadas()
    const listaMatriculas = await estudante.getAulasMatriculadas();
    //retornar o valor da lista
    return listaMatriculas;
  }

}

module.exports = PessoaServices;