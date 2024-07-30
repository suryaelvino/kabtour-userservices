import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public created_at!: Date;
    public updated_at!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tenant_id : {
        type: DataTypes.INTEGER,
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
    modelName: 'User',
    tableName: 'user',
    timestamps: false,
    hooks: {
        beforeCreate: async (user) => {
            let unique = false;
            while (!unique) {
                const id = Math.floor(Math.random() * 100000000);
                const existingUser = await User.findByPk(id);
                if (!existingUser) {
                    user.id = id;
                    unique = true;
                }
            }
        }
    }
});

export default User;
