module.exports = app => {
    const palavras = require("../controllers/palavra.controller.js");
    var router = require("express").Router();
    // Criar uma nova Palavra
    router.post("/", palavras.create);
    // Recuperar todas as palavras
    router.get("/", palavras.findAll);
    // Recuperar palavras revisadas
    router.get("/revisadas", palavras.findAllRevisadas);
    // Recuperar apenas uma palavra
    router.get("/:id", palavras.findOne);
    // Atualizar uma palavra
    router.put("/:id", palavras.update);
    // Deletar uma palavra pelo id
    router.delete("/:id", palavras.delete);
    // Delete todas as palavras
    router.delete("/", palavras.deleteAll);
    app.use('/api/palavras', router);
  };