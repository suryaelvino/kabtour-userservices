import Tenant from '../models/tenant';

class TenantService {
    async createTenant(data: { name?: string, description?: string, email?: string, app_name?: string, created_at?: Date, update_at?: Date }) {
        try {
            const tenant = await Tenant.create(data);
            return Promise.resolve(tenant);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getTenants() {
        try {
            const tenants = await Tenant.findAll({
                attributes: ['id', 'name', 'app_name']
            });
            return Promise.resolve(tenants);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getTenantById(id: number) {
        try {
            const tenant = await Tenant.findByPk(id);
            if (tenant) {
                return Promise.resolve(tenant);
            }
            throw new Error('Tenant not found');
        } catch (error) {
            return Promise.reject(error);
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
        } catch (error) {
            return Promise.reject(error);
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
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default new TenantService();
