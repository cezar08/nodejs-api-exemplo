module.exports = (sequelize, Sequelize) => {
    const Palavra = sequelize.define("palavra", {
      palavra: {
        type: Sequelize.STRING
      },
      significado: {
        type: Sequelize.STRING
      },
      expressao: {
        type: Sequelize.STRING
      },
      sinonimo: {
        type: Sequelize.STRING
      },
      revisada: {
        type: Sequelize.BOOLEAN
      }
    });
    return Palavra;
  };