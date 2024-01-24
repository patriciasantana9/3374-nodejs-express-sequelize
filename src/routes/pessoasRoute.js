const { Router } = require('express');

const PessoaController = require('../controllers/PessoaController.js');

const router = Router();

//rotaGet(caminho, acao.metodoDaAcao)
router.get('/pessoas', PessoaController.pegaTodas);

module.exports = router;