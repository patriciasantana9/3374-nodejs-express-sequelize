const Controller = require('./Controller.js');
const MatriculaServices = require('../services/MatriculaServices.js');

const matriculaService = new MatriculaServices();

class MatriculaController extends Controller {
  constructor(){
    super(matriculaService);
  }
}

module.exports = MatriculaController;