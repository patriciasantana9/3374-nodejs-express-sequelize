const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');
const MatriculaController = require('../controllers/MatriculaController.js');

const pessoaController = new PessoaController();
const matriculaController = new MatriculaController();

const router = Router();

//rotaGet(caminho, acao.metodoDaAcao)
router.get('/pessoas', (req, res) => pessoaController.pegaTodos(req, res));
router.get('/pessoas/todos', (req, res) => pessoaController.pegaTodasAsPessoas(req, res));
router.get('/pessoas/:id', (req, res) => pessoaController.pegaUmPorId(req, res));
router.post('/pessoas', (req, res) => pessoaController.criaNovo(req, res));
router.put('/pessoas/:id', (req, res) => pessoaController.atualiza(req, res));
router.put('/pessoas/:estudante_id/cancela', (req, res) => pessoaController.cancelaRegistroEstudante(req, res));
router.delete('/pessoas/:id', (req, res) => pessoaController.exclui(req, res));
/*
*a matrícula só precisa ser acessada a partir de uma pessoa ou curso específico, não precisa de uma rota inteira pra si
*pegar as matriculas ativas do estudante
*/
router.get('/pessoas/:estudante_id/matriculas', (req, res) => pessoaController.pegaMatriculasAtivas(req, res));
/**pegar todas as matrículas de determinado estudante */
router.get('/pessoas/:estudante_id/matriculas/todos', (req, res) => pessoaController.pegaTodasAsMatriculas(req, res));
//exibir matrículas por estudante e a quantidade delas
router.get('/pessoas/:estudante_id/matriculas/confirmadas', (req, res) => matriculaController.pegaMatriculasPorEstudante(req, res));
//contar quantidade de matrículas por curso
router.get('/pessoas/matriculas/lotadas', (req, res) => matriculaController.pegaCursosLotados(req, res));
/**pegar matrícula pelo id da matrícula */
router.get('/pessoas/:estudante_id/matriculas/:id', (req, res) => matriculaController.pegaUm(req, res));
//criar nova matrícula
router.post('/pessoas/:estudante_id/matriculas', (req, res) => matriculaController.criaNovo(req, res));
router.put('/pessoas/:estudante_id/matriculas/:id', (req, res) => matriculaController.atualiza(req, res));
router.delete('/pessoas/:estudante_id/matriculas/:id', (req, res) => matriculaController.exclui(req, res));

module.exports = router;