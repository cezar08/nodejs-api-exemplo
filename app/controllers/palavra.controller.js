const db = require("../models");
const Palavra = db.palavras;
const Op = db.Sequelize.Op;
// Criar e salvar uma nova palavra
exports.create = (req, res) => {    
    if (!req.body.palavra) {
      res.status(400).send({
        message: "O conteúdo não pode estar vazio!"
      });
      return;
    }
    // Criar uma palavra
    const palavra = {
        palavra: req.body.palavra,
        significado: req.body.significado,
        expressao: req.body.expressao,
        sinonimo: req.body.sinonimo,
        revisada: req.body.revisada ? req.body.revisada : false
    };
    // Salvar uma palavra
    Palavra.create(palavra)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Um erro ocorreu ao criar uma nova palavra."
        });
      });
  };
// Buscar todas as palavras
exports.findAll = (req, res) => {
    const palavra = req.query.palavra;
    var condition = palavra ? { palavra: { [Op.like]: `%${palavra}%` } } : null;
    Palavra.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro ocorreu ao recuperar as palavras"
        });
      });
  };
// Buscar uma única palavra
exports.findOne = (req, res) => {
    const id = req.params.id;
    Palavra.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Não foi possível encontrar palavra com o id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erro ao recuperar palavra com o id=" + id
        });
      });
  };
// Atualizar uma palavra pelo id
exports.update = (req, res) => {
    const id = req.params.id;
    Palavra.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Palavra atualizada com sucesso."
          });
        } else {
          res.send({
            message: `Não foi possível atualizar palavra com o id=${id}. Talvez a palavra não foi encontrada ou o req.body está vazio!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erro ao atualizar palavra com o id=" + id
        });
      });
  };
// Deletar uma palavra específica
exports.delete = (req, res) => {
    const id = req.params.id;
    Palavra.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Palavra foi deletada com sucesso!"
          });
        } else {
          res.send({
            message: `Não foi possível deletar a palavra com o id=${id}. Palavra não encontrada!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Não foi possível deletar a palavra com  id=" + id
        });
      });
  };
// Deletar todas as palavras
exports.deleteAll = (req, res) => {
    Palavra.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Palavras deletadas com sucesso!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro ocorreu ao tentar deletar as palavras"
        });
      });
  };
// Todas as palavras revisadas
exports.findAllRevisadas = (req, res) => {
    Palavra.findAll({ where: { revisada: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro ocorreu ao tentar recuperar as palavras"
        });
      });
  };