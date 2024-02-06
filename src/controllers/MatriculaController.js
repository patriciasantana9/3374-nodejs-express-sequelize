const Sequelize = require('sequelize');
const Controller = require('./Controller.js');
const MatriculaServices = require('../services/MatriculaServices.js');

const matriculaService = new MatriculaServices();

class MatriculaController extends Controller {
  constructor(){
    super(matriculaService);
  }
  //contar quantidade de matrícula por estudante
  async pegaMatriculasPorEstudante(req, res) {
    const { estudante_id } = req.params; // /pessoas/:estudante_id/matriculas
    try {
      const listaMatriculasPorEstudante = await matriculaService.pegaEContaRegistros({
        //especificações da busca
        where: { 
          estudante_id: Number(estudante_id),
          status: 'matriculado' /**não interessam matriculas canceladas */
        },
        limit: 2, /**2 registros por vez */
        order: [['id', 'DESC']] /**ordem descendente */
      });

      return res.status(200).json(listaMatriculasPorEstudante); /* poderia especificar com .count, para exibir apenas a quantidade, sem as matrículas */
    } catch (error) {
      return res.status(500).json({ error: error.message});
    }
  }

  //contar quantidade de matrículas por curso
  async pegaCursosLotados(req, res) {
    const lotacaoCurso = 2;

    try {
      const cursosLotados = await matriculaService.pegaEContaRegistros(
        {
          where: {
            status: 'matriculado'
          },
          attributes: ['curso_id'], /**agrupamento de matrículas por id de cursos */
          group: ['curso_id'], /**agrupamento de matrículas por id de cursos */
          having: Sequelize.literal(`count(curso_id) >= ${lotacaoCurso}`) /** Sequelize.literal para escrever uma query do SQL diretamente */
        });
      return res.status(200).json(cursosLotados.count);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = MatriculaController;