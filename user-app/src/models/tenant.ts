import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class Tenant extends Model {
    public id!: number;
    public filename!: string;
    public data!: Buffer;
    public userId!: number;
}

Tenant.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    app_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at :{
        type: DataTypes.DATE,
        allowNull: false
    },
    update_at :{
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Tenant',
    tableName: 'tenant',
    timestamps: false
});

export default Tenant;