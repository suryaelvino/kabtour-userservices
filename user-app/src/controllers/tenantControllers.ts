import { Request, Response } from 'express';
import TenantService from '../services/tenantServices';
import { StatusCodes } from 'http-status-codes';

class TenantController {
    async createTenant(req: Request, res: Response) {
        const { name, description, email, app_name } = req.body;
        try {
            const tenant = await TenantService.createTenant({
                name,
                description,
                email,
                app_name,
                created_at: new Date(),
                update_at: new Date()
            });
            return res.status(StatusCodes.CREATED).json({ data: tenant });
        } catch (error: unknown) {
            console.error('Error creating tenant:', error);
            if (error instanceof Error) {
                if (error.message.includes('name already exists')) {
                    return res.status(StatusCodes.CONFLICT).json({ error: 'Tenant name already exists' });
                }
                if (error.message.includes('email already exists')) {
                    return res.status(StatusCodes.CONFLICT).json({ error: 'Tenant email already exists' });
                }
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error creating tenant' });
        }
    }

    async getTenants(req: Request, res: Response) {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;
        try {
            const result = await TenantService.getTenants(page, limit);
            return res.status(StatusCodes.OK).json(result);
        } catch (error: unknown) {
            console.error('Error fetching tenants:', error);
            if (error instanceof Error && error.message === 'No tenants found for the given page and limit') {
                return res.status(StatusCodes.NOT_FOUND).json({ error: 'No tenants found for the given page and limit' });
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error fetching tenants' });
        }
    }

    async getTenantById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const tenant = await TenantService.getTenantById(Number(id));
            return res.status(StatusCodes.OK).json(tenant);
        } catch (error: unknown) {
            console.error('Error fetching tenant:', error);
            if (error instanceof Error && error.message === 'Tenant not found') {
                return res.status(StatusCodes.NOT_FOUND).json({ error: 'Tenant not found' });
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error fetching tenant' });
        }
    }

    async updateTenant(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description, email, app_name } = req.body;
        try {
            const tenant = await TenantService.updateTenant(Number(id), {
                name,
                description,
                email,
                app_name,
                update_at: new Date()
            });
            return res.status(StatusCodes.OK).json(tenant);
        } catch (error: unknown) {
            console.error('Error updating tenant:', error);
            if (error instanceof Error) {
                if (error.message.includes('name already exists')) {
                    return res.status(StatusCodes.CONFLICT).json({ error: 'Tenant name already exists' });
                }
                if (error.message.includes('email already exists')) {
                    return res.status(StatusCodes.CONFLICT).json({ error: 'Tenant email already exists' });
                }
                if (error.message === 'Tenant not found') {
                    return res.status(StatusCodes.NOT_FOUND).json({ error: 'Tenant not found' });
                }
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error updating tenant' });
        }
    }

    async deleteTenant(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await TenantService.deleteTenant(Number(id));
            return res.status(StatusCodes.NO_CONTENT).send();
        } catch (error: unknown) {
            console.error('Error deleting tenant:', error);
            if (error instanceof Error && error.message === 'Tenant not found') {
                return res.status(StatusCodes.NOT_FOUND).json({ error: 'Tenant not found' });
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error deleting tenant' });
        }
    }
}

export default new TenantController();
