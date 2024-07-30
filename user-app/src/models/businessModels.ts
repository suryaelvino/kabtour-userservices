import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class Business extends Model {
    public id!: number;
    public name!: string;
    public created_at!: Date;
    public updated_at!: Date;
}

Business.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    description:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Business',
    tableName: 'business',
    timestamps: false,
    hooks: {
        beforeCreate: async (business) => {
            let unique = false;
            while (!unique) {
                const id = Math.floor(Math.random() * 100000000);
                const existingBusiness = await Business.findByPk(id);
                if (!existingBusiness) {
                    business.id = id;
                    unique = true;
                }
            }
        }
    }
});

export default Business;