const Controller = require('./Controller.js');
const CategoriaServices = require('../services/CategoriaServices.js');

const categoriaService = new CategoriaServices();

class CategoriaController extends Controller {
  constructor(){
    super(categoriaService);
  }
}

module.exports = CategoriaController;