const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');

const pessoaController = new PessoaController();

const router = Router();

//rotaGet(caminho, acao.metodoDaAcao)
router.get('/pessoas', (req, res) => pessoaController.pegaTodos(req, res));

module.exports = router;