import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class User extends Model {
    public id!: number;
    public first_name!: string;
    public last_name!: string;
    public email!: string;
    public verified!: boolean;
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
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phonenumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM('male', 'female'),
        allowNull: false,
    },
    bank_account: {
        type: DataTypes.JSONB,
        allowNull: true,
    },
    verified: {
        type: DataTypes.BOOLEAN
    },
    role: {
        type: DataTypes.ENUM('superadmin', 'admin', 'approval', 'partner', 'traveler')
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
    indexes: [
        {
            unique: true,
            fields: ['email', 'tenant_id', 'role']
        }
    ],
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
