import Tenant from '../models/tenantModels';
import Business from '../models/businessModels';
import { UniqueConstraintError } from 'sequelize';

class TenantService {
    createTenant(data: { name?: string, description?: string, email?: string, app_name?: string, business?: number[], created_at?: Date, updated_at?: Date }): Promise<Tenant> {
        return new Promise(async (resolve, reject) => {
            try {
                if (data.business) {
                    const validBusinesses = await Business.findAll({
                        where: {
                            id: data.business
                        }
                    });
                    const validBusinessIds = validBusinesses.map(b => b.id);
                    if (validBusinessIds.length !== data.business.length) {
                        return reject(new Error('Some business IDs are invalid'));
                    }
                }
                const tenant = await Tenant.create(data);
                resolve(tenant);
            } catch (error: any) {
                if (error instanceof UniqueConstraintError) {
                    if (error.errors.some(e => e.path === 'name')) {
                        return reject(new Error('Tenant name already exists'));
                    }
                    if (error.errors.some(e => e.path === 'email')) {
                        return reject(new Error('Tenant email already exists'));
                    }
                }
                reject(new Error('Error creating tenant: ' + error.message));
            }
        });
    }

    getTenants(page: number = 1, limit: number = 10): Promise<{ data: Tenant[], total: number, page: number, limit: number }> {
        return new Promise(async (resolve, reject) => {
            try {
                const offset = (page - 1) * limit;
                const tenants = await Tenant.findAndCountAll({
                    attributes: ['id', 'name', 'app_name', 'business'],
                    limit: limit,
                    offset: offset
                });
                if (tenants.rows.length === 0) {
                    return reject(new Error('No tenants found for the given page and limit'));
                }
                resolve({
                    data: tenants.rows,
                    total: tenants.count,
                    page,
                    limit
                });
            } catch (error: any) {
                reject(new Error('Error fetching tenants: ' + error.message));
            }
        });
    }

    getTenantById(id: number): Promise<{ id: number, name: string, app_name: string, business: { id: number, name: string }[] }> {
        return new Promise(async (resolve, reject) => {
            try {
                const tenant = await Tenant.findByPk(id);
                if (!tenant) {
                    return reject(new Error('Tenant not found'));
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
                resolve({
                    ...tenantData,
                    business: businessDetails
                });
            } catch (error: any) {
                reject(new Error('Error fetching tenant: ' + error.message));
            }
        });
    }

    updateTenant(id: number, data: { name?: string, description?: string, email?: string, app_name?: string, business?: number[], updated_at?: Date }): Promise<Tenant> {
        return new Promise(async (resolve, reject) => {
            try {
                const tenant = await Tenant.findByPk(id);
                if (!tenant) {
                    return reject(new Error('Tenant not found'));
                }
                if (data.business) {
                    const validBusinesses = await Business.findAll({
                        where: {
                            id: data.business
                        }
                    });
                    const validBusinessIds = validBusinesses.map(b => b.id);
                    if (validBusinessIds.length !== data.business.length) {
                        return reject(new Error('Some business IDs are invalid'));
                    }
                }
                const updatedTenant = await tenant.update(data);
                resolve(updatedTenant);
            } catch (error: any) {
                if (error instanceof UniqueConstraintError) {
                    if (error.errors.some(e => e.path === 'name')) {
                        return reject(new Error('Tenant name already exists'));
                    }
                    if (error.errors.some(e => e.path === 'email')) {
                        return reject(new Error('Tenant email already exists'));
                    }
                }
                reject(new Error('Error updating tenant: ' + error.message));
            }
        });
    }

    deleteTenant(id: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const tenant = await Tenant.findByPk(id);
                if (!tenant) {
                    return reject(new Error('Tenant not found'));
                }
                await tenant.destroy();
                resolve();
            } catch (error: any) {
                reject(new Error('Error deleting tenant: ' + error.message));
            }
        });
    }
}

export default new TenantService();
