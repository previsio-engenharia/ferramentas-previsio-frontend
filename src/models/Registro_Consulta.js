const Sequelize = require('sequelize');
const database = require('./db');

const Registro_Consulta = database.define('registro_consultas', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allownull: false,
        primaryKey: true
    },
    tipo:{
        type: Sequelize.STRING(16),
        allownull: false
    },
    status:{
        type: Sequelize.STRING(16),
        allownull: false
    },
    cnpj:{
        type: Sequelize.STRING(32)
    },
    cnae1:{
        type: Sequelize.STRING(8)
    },
    cnae2:{
        type: Sequelize.STRING(8)
    },
    nro_trabalhadores:{
        type: Sequelize.INTEGER,
    },
    email: {
        type: Sequelize.STRING(64)
    }
});

//Cria a tabela do DataBase se não existe
Registro_Consulta.sync();

//Realiza alterações na tabela conforme implementado
//Registro_Consulta.sync({alter:true})

module.exports = Registro_Consulta;


/*
CREATE TABLE `registro_consultas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(16) DEFAULT NULL,
  `status` varchar(16) DEFAULT NULL,
  `cnpj` varchar(32) DEFAULT NULL,
  `cnae1` varchar(8) DEFAULT NULL,
  `cnae2` varchar(8) DEFAULT NULL,
  `nro_trabalhadores` int(11) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4
*/