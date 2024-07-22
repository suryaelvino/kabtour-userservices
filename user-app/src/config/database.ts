import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('user', 'root', 'adminuser12_', {
    host: '127.0.0.1',
    dialect: 'postgres',
});

export default sequelize;

// Function to test the database connection
const authenticateDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

// Call the authenticate function
authenticateDatabase();
