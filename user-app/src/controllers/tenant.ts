import { Request, Response } from 'express';
import * as tenantService from '../services/tenant';

export const createTenant = async (req: Request, res: Response) => {
    const { name, description, email, app_name } = req.body;
    const created_at = new Date;
    const update_at = new Date;
    try {
        const tenant = await tenantService.createTenant({ name, description, email, app_name, created_at, update_at });
        res.status(201).json({ data:tenant });
    } catch (error) {
        console.error('Error creating tenant:', error);
        res.status(500).json({ error: 'Error creating tenant' });
    }
};

export const getTenants = async (req: Request, res: Response) => {
    try {
        const tenants = await tenantService.getTenants();
        res.status(200).json({ data:tenants });
    } catch (error) {
        console.error('Error fetching tenants:', error);
        res.status(500).json({ error: 'Error fetching tenants' });
    }
};

export const getTenantById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const tenant = await tenantService.getTenantById(Number(id));
        if (tenant) {
            res.status(200).json(tenant);
        } else {
            res.status(404).json({ error: 'Tenant not found' });
        }
    } catch (error) {
        console.error('Error fetching tenant:', error);
        res.status(500).json({ error: 'Error fetching tenant' });
    }
};

export const updateTenant = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, email, app_name } = req.body;
    const update_at = new Date;
    try {
        const tenant = await tenantService.updateTenant(Number(id), { name, description, email, app_name, update_at });
        res.status(200).json(tenant);
    } catch (error:any) {
        console.error('Error updating tenant:', error);
        if (error.message === 'Tenant not found') {
            res.status(404).json({ error: 'Tenant not found' });
        } else {
            res.status(500).json({ error: 'Error updating tenant' });
        }
    }
};

export const deleteTenant = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await tenantService.deleteTenant(Number(id));
        res.status(204).send();
    } catch (error:any) {
        console.error('Error deleting tenant:', error);
        if (error.message === 'Tenant not found') {
            res.status(404).json({ error: 'Tenant not found' });
        } else {
            res.status(500).json({ error: 'Error deleting tenant' });
        }
    }
};
