import { Request, Response } from 'express';
import TenantService from '../services/tenant';
import { StatusCodes } from 'http-status-codes';

class TenantController {
    async createTenant(req: Request, res: Response) {
        const { name, description, email, app_name } = req.body;
        try {
            const tenant = await TenantService.createTenant({ name, description, email, app_name, created_at:new Date(), update_at:new Date() });
            return res.status(StatusCodes.CREATED).json({ data: tenant });
        } catch (error) {
            console.error('Error creating tenant:', error);
            return res.status(StatusCodes.CONFLICT).json({ error: 'Error creating tenant' });
        }
    }

    async getTenants(req: Request, res: Response) {
        try {
            const tenants = await TenantService.getTenants();
            return res.status(StatusCodes.OK).json({ data: tenants });
        } catch (error) {
            console.error('Error fetching tenants:', error);
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Error fetching tenants' });
        }
    }

    async getTenantById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const tenant = await TenantService.getTenantById(Number(id));
            if (tenant) {
                return res.status(StatusCodes.OK).json(tenant);
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ error: 'Tenant not found' });
            }
        } catch (error) {
            console.error('Error fetching tenant:', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error fetching tenant' });
        }
    }

    async updateTenant(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description, email, app_name } = req.body;
        try {
            const tenant = await TenantService.updateTenant(Number(id), { name, description, email, app_name, update_at: new Date() });
            return res.status(StatusCodes.OK).json(tenant);
        } catch (error: any) {
            console.error('Error updating tenant:', error);
            if (error.message === 'Tenant not found') {
                return res.status(StatusCodes.NOT_FOUND).json({ error: 'Tenant not found' });
            } else {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error updating tenant' });
            }
        }
    }

    async deleteTenant(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await TenantService.deleteTenant(Number(id));
            return res.status(StatusCodes.NO_CONTENT).send();
        } catch (error: any) {
            console.error('Error deleting tenant:', error);
            if (error.message === 'Tenant not found') {
                return res.status(StatusCodes.NOT_FOUND).json({ error: 'Tenant not found' });
            } else {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error deleting tenant' });
            }
        }
    }
}

export default new TenantController();
