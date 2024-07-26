import Tenant from '../models/tenantModels';
import Business from '../models/businessModels'; 
import { UniqueConstraintError } from 'sequelize';

class TenantService {
    async createTenant(data: { name?: string, description?: string, email?: string, app_name?: string, business?: number[], created_at?: Date, update_at?: Date }) {
        try {
            if (data.business) {
                const validBusinesses = await Business.findAll({
                    where: {
                        id: data.business
                    }
                });
                const validBusinessIds = validBusinesses.map(b => b.id);
                if (validBusinessIds.length !== data.business.length) {
                    throw new Error('Some business IDs are invalid');
                }
            }
            const tenant = await Tenant.create(data);
            return tenant;
        } catch (error: any) {
            if (error instanceof UniqueConstraintError) {
                if (error.errors.some(e => e.path === 'name')) {
                    throw new Error('Tenant name already exists');
                }
                if (error.errors.some(e => e.path === 'email')) {
                    throw new Error('Tenant email already exists');
                }
            }
            throw new Error('Error creating tenant: ' + error.message);
        }
    }

    async getTenants(page: number = 1, limit: number = 10) {
        try {
            const offset = (page - 1) * limit;
            const tenants = await Tenant.findAndCountAll({
                attributes: ['id', 'name', 'app_name', 'business'],
                limit: limit,
                offset: offset
            });
            return {
                data: tenants.rows,
                total: tenants.count,
                page,
                limit
            };
        } catch (error: any) {
            throw new Error('Error fetching tenants: ' + error.message);
        }
    }

    async getTenantById(id: number) {
        try {
            const tenant = await Tenant.findByPk(id);
            if (!tenant) {
                throw new Error('Tenant not found');
            }
            const businessIds = tenant.business as number[];
            const businesses = await Business.findAll({
                where: {
                    id: businessIds
                },
                attributes: ['id', 'name']
            });
            const businessDetails = businesses.map(b => ({
                id: b.id,
                name: b.name
            }));
            const tenantData = tenant.toJSON();
            delete tenantData.business;
            return {
                ...tenantData,
                business: businessDetails
            };
        } catch (error: any) {
            throw new Error('Error fetching tenant: ' + error.message);
        }
    }
    

    async updateTenant(id: number, data: { name?: string, description?: string, email?: string, app_name?: string, business?: number[], update_at?: Date }) {
        try {
            const tenant = await Tenant.findByPk(id);
            if (!tenant) {
                throw new Error('Tenant not found');
            }

            // Validate business IDs before updating tenant
            if (data.business) {
                const validBusinesses = await Business.findAll({
                    where: {
                        id: data.business
                    }
                });
                const validBusinessIds = validBusinesses.map(b => b.id);
                if (validBusinessIds.length !== data.business.length) {
                    throw new Error('Some business IDs are invalid');
                }
            }

            const updatedTenant = await tenant.update(data);
            return updatedTenant;
        } catch (error: any) {
            if (error instanceof UniqueConstraintError) {
                if (error.errors.some(e => e.path === 'name')) {
                    throw new Error('Tenant name already exists');
                }
                if (error.errors.some(e => e.path === 'email')) {
                    throw new Error('Tenant email already exists');
                }
            }
            throw new Error('Error updating tenant: ' + error.message);
        }
    }

    async deleteTenant(id: number) {
        try {
            const tenant = await Tenant.findByPk(id);
            if (!tenant) {
                throw new Error('Tenant not found');
            }
            await tenant.destroy();
        } catch (error: any) {
            throw new Error('Error deleting tenant: ' + error.message);
        }
    }
}

export default new TenantService();
