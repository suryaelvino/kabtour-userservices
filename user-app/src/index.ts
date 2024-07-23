import express, { Application } from 'express';
import sequelize from './config/database';
import tenantRoutes from './routes/tenant';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

class Server {
    public app: Application;
    public port: string | number;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3001;

        this.middleware();
        this.routes();
        this.databaseWithRetry(5, 3000);
    }

    private middleware() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    private routes() {
        this.app.use('/tenant', tenantRoutes);
    }

    private async database() {
        try {
            await sequelize.authenticate();
            console.log('Database connected');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            throw error;
        }
    }

    private async databaseWithRetry(retries: number, delay: number) {
        for (let i = 0; i < retries; i++) {
            try {
                await this.database();
                return;
            } catch (error) {
                if (i < retries - 1) {
                    console.log(`Retrying to connect to the database... (${i + 1}/${retries})`);
                    await new Promise(res => setTimeout(res, delay));
                } else {
                    console.error('Failed to connect to the database after multiple attempts');
                    process.exit(1);
                }
            }
        }
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }
}

const server = new Server();
server.listen();
