const Controller = require('./Controller.js');
const CursoServices = require('../services/CursoServices.js');

const cursoService = new CursoServices();

class CursoController extends Controller {
  constructor(){
    super(cursoService);
  }
}

module.exports = CursoController;