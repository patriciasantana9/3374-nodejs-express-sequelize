const express = require('express');
const pessoas = require('./pessoasRoute.js');
const categorias = require('./categoriasRoute.js');
const cursos = require('./cursosRoute.js');

//exportar função que recebe app e passa para dentro dos middlewares do express o middleware de lidar com json e todas as rotas de pessoas
module.exports = app => {
  //criação do middleware; 
  app.use(
    express.json(),
    pessoas,
    categorias,
    cursos
  );
};