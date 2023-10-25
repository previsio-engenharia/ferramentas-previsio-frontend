const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:'mysql',
    dialectModule: require('mysql2'),
})

sequelize.authenticate()
    .then(() => {
        console.log("Conexao com banco de dados realizada com sucesso!");
    }).catch((err) => {
        console.log("Erro: conexao com banco de dados nao realizada com sucesso!");
        console.log(err);
})

module.exports = sequelize;