import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('user', 'root', 'adminuser12_', {
    host: 'postgres',
    dialect: 'postgres',
    port: 5432,
  });

// export const sequelize =  new Sequelize('postgres://root:adminuser12_@postgres:5432/user', {
//     dialect: 'postgres',
// });

export default sequelize;

const authenticateDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

authenticateDatabase();
