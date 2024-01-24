const database = require('../models');
//dentro de models, tem um index.js, que é o chamado aqui; ele gerencia todos os models

class PessoaController {
  static async pegaTodas(req, res){
    try {
      //o método Pessoa que é gerenciado no index.js de models; todos os métodos do sequelize podem ser usados para interagir com o banco; o método Pessoa disponibiliza o findAll();
      const listaDePessoas = await database.Pessoa.findAll();
      return res.status(200).json(listaDePessoas);
    } catch (error) {
      //erro
    }
  }
}

module.export = PessoaController;