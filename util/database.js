const Sequelize = require('sequelize');

const sequelize = new Sequelize('shop','root','rootroot',{
     dialect:'mysql' ,
     host: 'localhost'
    });


module.exports = sequelize;