'use strict';
const isCpfValido = require('../../utils/validaCpfHelper.js'); /* função helper para validação */
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    static associate(models) {
      /* Model.associação(models.Model) */
      Pessoa.hasMany(models.Curso, {
        foreignKey: 'docente_id'
      });
      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id',
        scope: { status: 'matriculado' },
        as: 'aulasMatriculadas'
      }); /**para exibir todas as matrículas, escopo geral; precisa de nova rota também e controlador da rota */
      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id',
        as: 'todasAsMatriculas'
      });
    }
  }
  Pessoa.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        len: {
          /* argumentos do validador */
          args: [3, 30],
          msg: 'O campo nome deve ter no mínimo 3 caracteres e no máximo 30.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Formato do e-mail inválido.' /* esse erro será indicado pelo Controller.js */
        }
      }
    },
    cpf: {
      type: DataTypes.STRING,
      validate: {
        cpfEhValido: (cpf) => {
          //usará uma função helper
          if(!isCpfValido(cpf)) throw new Error('Número de CPF inválido.');
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoa',
    tableName: 'pessoas',
    paranoid: true,
    defaultScope: {
      where: {
        ativo: true,
      }
    },
    scopes: {
      todosOsRegistros: {
        where: {} /* sem especificação; tudo */
      }
    }
  });
  return Pessoa;
};