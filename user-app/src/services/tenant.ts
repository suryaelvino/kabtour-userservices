import Tenant from '../models/tenant';

export const createTenant = async (data: { name?: string, description?: string, email?: string, app_name?: string, created_at?: Date, update_at?: Date }) => {
    return Tenant.create(data);
};

export const getTenants = async () => {
    return Tenant.findAll({
        attributes: ['id', 'name', 'app_name']
    });
};

export const getTenantById = async (id: number) => {
    return Tenant.findByPk(id);
};

export const updateTenant = async (id: number, data: { name?: string, description?: string, email?: string, app_name?: string, update_at: Date }) => {
    const tenant = await Tenant.findByPk(id);
    if (tenant) {
        return tenant.update(data);
    }
    throw new Error('Tenant not found');
};

export const deleteTenant = async (id: number) => {
    const tenant = await Tenant.findByPk(id);
    if (tenant) {
        await tenant.destroy();
    } else {
        throw new Error('Tenant not found');
    }
};
