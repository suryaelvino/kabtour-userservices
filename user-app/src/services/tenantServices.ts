import Tenant from '../models/tenant';
import { UniqueConstraintError } from 'sequelize';

class TenantService {
    async createTenant(data: { name?: string, description?: string, email?: string, app_name?: string, created_at?: Date, update_at?: Date }) {
        try {
            const tenant = await Tenant.create(data);
            return Promise.resolve(tenant);
        } catch (error:any) {
            if (error instanceof UniqueConstraintError) {
                if (error.errors.some(e => e.path === 'name')) {
                    return Promise.reject(new Error('Tenant name already exists'));
                }
                if (error.errors.some(e => e.path === 'email')) {
                    return Promise.reject(new Error('Tenant email already exists'));
                }
            }
            return Promise.reject(new Error('Error creating tenant: ' + error.message));
        }
    }

    async getTenants(page: number = 1, limit: number = 10) {
        try {
            const offset = (page - 1) * limit;
            const tenants = await Tenant.findAndCountAll({
                attributes: ['id', 'name', 'app_name'],
                limit: limit,
                offset: offset
            });
            if (tenants.rows.length === 0) {
                throw new Error('No tenants found for the given page and limit');
            }
            return Promise.resolve({
                data: tenants.rows,
                total: tenants.count,
                page,
                limit
            });
        } catch (error:any) {
            return Promise.reject(new Error('Error fetching tenants: ' + error.message));
        }
    }

    async getTenantById(id: number) {
        try {
            const tenant = await Tenant.findByPk(id);
            if (tenant) {
                return Promise.resolve(tenant);
            }
            throw new Error('Tenant not found');
        } catch (error:any) {
            return Promise.reject(new Error('Error fetching tenant: ' + error.message));
        }
    }

    async updateTenant(id: number, data: { name?: string, description?: string, email?: string, app_name?: string, update_at?: Date }) {
        try {
            const tenant = await Tenant.findByPk(id);
            if (tenant) {
                const updatedTenant = await tenant.update(data);
                return Promise.resolve(updatedTenant);
            }
            throw new Error('Tenant not found');
        } catch (error:any) {
            if (error instanceof UniqueConstraintError) {
                if (error.errors.some(e => e.path === 'name')) {
                    return Promise.reject(new Error('Tenant name already exists'));
                }
                if (error.errors.some(e => e.path === 'email')) {
                    return Promise.reject(new Error('Tenant email already exists'));
                }
            }
            return Promise.reject(new Error('Error updating tenant: ' + error.message));
        }
    }

    async deleteTenant(id: number) {
        try {
            const tenant = await Tenant.findByPk(id);
            if (tenant) {
                await tenant.destroy();
                return Promise.resolve();
            }
            throw new Error('Tenant not found');
        } catch (error:any) {
            return Promise.reject(new Error('Error deleting tenant: ' + error.message));
        }
    }
}

export default new TenantService();
