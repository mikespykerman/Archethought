const { Sequelize } = require('sequelize');

async function connectToDatabase() {
    try {
      const sequelize = new Sequelize('postgres://zeomedical:1234@localhost:5432/zeomedical',{ logging: true })
      await sequelize.authenticate();
      console.log('Connection to database has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

module.exports = { connectToDatabase };
