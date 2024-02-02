const converteIds = require('../utils/conversorDeStringHelper.js'); /**converte os id recebidos em string para Number */

class Controller {
  constructor(entidadeService){
    this.entidadeService = entidadeService;
  }

  //requisição e resposta
  
  //pegar o registro de qualquer controller
  async pegaTodos(req, res){
    try {
    //o método Pessoa que é gerenciado no index.js de models; todos os métodos do sequelize podem ser usados para interagir com o banco; o método Pessoa disponibiliza o findAll();
      const listaDeRegistro = await this.entidadeService.pegaTodosOsRegistros();
      return res.status(200).json(listaDeRegistro);  
    } catch(error) {
      return res.status(500).json({ erro: error.message});
    }
  }

  async pegaUmPorId(req, res) {
    const { id } = req.params;
    try {
      const umRegistro = await this.entidadeService.pegaUmRegistroPorId(Number(id));
      return res.status(200).json(umRegistro);
    } catch (error) {
      return res.status(500).json({ erro: error.message});
    }
  }

  async pegaUm(req, res) {
    const { ...params } = req.params; /**tudo o que vier de params */
    const where = converteIds(params);
    try {
      const umRegistro = await this.entidadeService.pegaUmRegistro(where);
      return res.status(200).json(umRegistro);
    } catch (error) {
      return res.status(500).json({ erro: error.message});
    }
  }

  async criaNovo(req, res) {
    const dadosParaCriacao = req.body;
    try {
      const novoRegistroCriado = await this.entidadeService.criaRegistro(dadosParaCriacao);
      return res.status(200).json(novoRegistroCriado);
    } catch (error) {
      return res.status(500).json({ erro: error.message});
    }
  }

  async atualiza(req, res){
    const { id } = req.params;
    const dadosAtualizados = req.body;

    try { /* isUpdated */
      const foiAtualizado = await this.entidadeService.atualizaRegistro(dadosAtualizados, Number(id));
      if(!foiAtualizado) {
        return res.status(400).json({ mensagem: 'O registro não foi atualizado.'});  
      }
      return res.status(200).json({ mensagem: 'Registro atualizado com sucesso.'});  
    } catch (error) {
      return res.status(500).json({ erro: error.message});
    }
  }

  async exclui(req, res) {
    const { id } = req.params;
    try {
      await this.entidadeService.excluiRegistro(Number(id));
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (error) {
      return res.status(500).json({ erro: error.message} );
    }
  }
}

module.exports = Controller;