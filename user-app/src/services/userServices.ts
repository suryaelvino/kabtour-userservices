import User from '../models/userModels';
import { Op, UniqueConstraintError } from 'sequelize';

class UserService {
    createUser(data: { 
        first_name: string, 
        last_name: string, 
        email: string, 
        phonenumber: number, 
        gender: 'male' | 'female', 
        bank_account: object, 
        verified?: boolean, 
        role: 'superadmin' | 'admin' | 'approval' | 'partner' | 'traveler', 
        tenant_id: number 
    }): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                data.verified = data.verified ?? false;
                if (data.role === 'superadmin') {
                    data.verified = true;
                }
                const user = await User.create(data);
                resolve(user);
            } catch (error: any) {
                if (error instanceof UniqueConstraintError) {
                    if (error.errors.some(e => e.path === 'users_email_tenant_id_role')) {
                        return reject(new Error('User with the same email, tenant_id, and role already exists'));
                    }
                }
                reject(new Error('Error creating user: ' + error.message));
            }
        });
    }

    getUserById(id: number): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findByPk(id);
                if (!user) {
                    return reject(new Error('User not found'));
                }
                resolve(user);
            } catch (error: any) {
                reject(new Error('Error retrieving user: ' + error.message));
            }
        });
    }

    updateUser(id: number, data: { 
        first_name?: string, 
        last_name?: string, 
        email?: string, 
        phonenumber?: number, 
        gender?: 'male' | 'female', 
        bank_account?: object, 
        verified?: boolean, 
        role?: 'superadmin' | 'admin' | 'approval' | 'mitra' | 'wisatawan', 
        tenant_id?: number 
    }): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findByPk(id);
                if (!user) {
                    return reject(new Error('User not found'));
                }
                const updatedUser = await user.update(data);
                resolve(updatedUser);
            } catch (error: any) {
                if (error instanceof UniqueConstraintError) {
                    if (error.errors.some(e => e.path === 'users_email_tenant_id_role')) {
                        return reject(new Error('User with the same email, tenant_id, and role already exists'));
                    }
                }
                reject(new Error('Error updating user: ' + error.message));
            }
        });
    }

    deleteUser(id: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findByPk(id);
                if (!user) {
                    return reject(new Error('User not found'));
                }
                await user.destroy();
                resolve();
            } catch (error: any) {
                reject(new Error('Error deleting user: ' + error.message));
            }
        });
    }

    getAllUsers(page: number = 1, limit: number = 10, filters: any = {}): Promise<{ data: User[], total: number, page: number, limit: number }> {
        return new Promise(async (resolve, reject) => {
            try {
                const offset = (page - 1) * limit;
                const where: any = {};
                if (filters.new_user === true) {
                    const threeDaysAgo = new Date();
                    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
                    where.created_at = {
                        [Op.gte]: threeDaysAgo
                    };
                }
                if (filters.role) {
                    where.role = filters.role;
                }
                if (filters.tenant_id) {
                    where.tenant_id = filters.tenant_id;
                }
                const users = await User.findAndCountAll({
                    where,
                    limit: limit,
                    offset: offset
                });
                if (users.rows.length === 0) {
                    return reject(new Error('No users found for the given filters'));
                }
                resolve({
                    data: users.rows,
                    total: users.count,
                    page,
                    limit
                });
            } catch (error: any) {
                reject(new Error('Error fetching users: ' + error.message));
            }
        });
    }

    verifyUser(id: number): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findByPk(id);
                if (!user) {
                    return reject(new Error('User not found'));
                }
                user.verified = true;
                const updatedUser = await user.save();
                resolve(updatedUser);
            } catch (error: any) {
                reject(new Error('Error verifying user: ' + error.message));
            }
        });
    }
}

export default new UserService();
