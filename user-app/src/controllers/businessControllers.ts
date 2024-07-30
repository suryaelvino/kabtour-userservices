import { Request, Response } from 'express';
import BusinessService from '../services/businessServices';
import { StatusCodes } from 'http-status-codes';

class BusinessController {
    async createBusiness(req: Request, res: Response) {
        const { name, description } = req.body;
        const created_at = new Date();
        const updated_at = new Date();
        try {
            const business = await BusinessService.createBusiness({ name, description,created_at, updated_at });
            return res.status(StatusCodes.CREATED).json({ data: business });
        } catch (error: any) {
            console.error('Error creating business:', error);
            if (error.message === 'Business name already exists') {
                return res.status(StatusCodes.CONFLICT).json({ error: error.message });
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error creating business' });
        }
    }

    async getBusinesses(req: Request, res: Response) {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;
        try {
            const result = await BusinessService.getBusinesses(page, limit);
            return res.status(StatusCodes.OK).json(result);
        } catch (error: any) {
            console.error('Error fetching businesses:', error);
            if (error.message === 'No businesses found for the given page and limit') {
                return res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
            } else {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error fetching businesses' });
            }
        }
    }

    async getBusinessById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const business = await BusinessService.getBusinessById(Number(id));
            if (business) {
                return res.status(StatusCodes.OK).json(business);
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ error: 'Business not found' });
            }
        } catch (error) {
            console.error('Error fetching business:', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error fetching business' });
        }
    }

    async updateBusiness(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description } = req.body;
        const updated_at = new Date;
        try {
            const business = await BusinessService.updateBusiness(Number(id), { name, description, updated_at });
            return res.status(StatusCodes.OK).json(business);
        } catch (error: any) {
            console.error('Error updating business:', error);
            if (error.message === 'Business not found') {
                return res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
            } else if (error.message === 'Business name already exists') {
                return res.status(StatusCodes.CONFLICT).json({ error: error.message });
            } else {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error updating business' });
            }
        }
    }

    async deleteBusiness(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await BusinessService.deleteBusiness(Number(id));
            return res.status(StatusCodes.NO_CONTENT).send();
        } catch (error: any) {
            console.error('Error deleting business:', error);
            if (error.message === 'Business not found') {
                return res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
            } else {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error deleting business' });
            }
        }
    }
}

export default new BusinessController();
