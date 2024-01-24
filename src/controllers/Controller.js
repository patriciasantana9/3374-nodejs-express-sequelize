class Controller {
  constructor(entidadeService){
    this.entidadeService = entidadeService;
  }

  //pegar o registro de qualquer controller
  async pegaTodos(req, res){
    try {
    //o método Pessoa que é gerenciado no index.js de models; todos os métodos do sequelize podem ser usados para interagir com o banco; o método Pessoa disponibiliza o findAll();
      const listaDeRegistro = await this.entidadeService.pegaTodosOsRegistros();
      return res.status(200).json(listaDeRegistro);  
    } catch(error) {
      //erro
    }
  }
}

module.exports = Controller;