import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class Tenant extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public email!: string;
    public business!: object;
    public app_name!: string;
    public created_at!: Date;
    public update_at!: Date;
}

Tenant.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING(2000),
        allowNull: false
    },
    business:{
        type: DataTypes.JSONB,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    app_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    update_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Tenant',
    tableName: 'tenant',
    timestamps: false,
    hooks: {
        beforeCreate: async (tenant) => {
            let unique = false;
            while (!unique) {
                const id = Math.floor(Math.random() * 100000000);
                const existingTenant = await Tenant.findByPk(id);
                if (!existingTenant) {
                    tenant.id = id;
                    unique = true;
                }
            }
        }
    }
});

export default Tenant;
