const Controller = require('./Controller.js');
const CursoServices = require('../services/CursoServices.js');
const { Op } = require('sequelize');

const cursoService = new CursoServices();

class CursoController extends Controller {
  constructor(){
    super(cursoService);
  }

  //query string (a partir de /cursos): ?data_inicial=2023-01-01&data_final=2023-03-01

  async pegaCursos(req, res){
    const { data_inicial, data_final } = req.query; /**pegar as var d_i e d_f da query */
    const where = {};
    
    //se existirem os params, criar uma propriedade dentro de where; senão, fica como null
    data_inicial || data_final ? where.data_inicio = {} : null;
    
    //se existir data inicial, adiciona a prop gte com o valor
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
    
    //se existir data final, idem
    data_final ? where.data_inicio[Op.lte] = data_final : null;
    
    /* como deve ficar se existirem os params:
    const where = {
      data_inicio: { *data_inicio é uma coluna do model cursos 
        [Op.gte]: data, *Op: operador do Sequelize
        [Op.lte]: data
      } 
    }*/

    try {
      const listaCursos = await cursoService.pegaTodosOsRegistros(where);
      return res.status(200).json(listaCursos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CursoController;