import express from 'express';
import sequelize from './config/database';
import tenantRoutes from './routes/tenant';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use('/tenant', tenantRoutes);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
