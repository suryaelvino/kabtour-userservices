// services/BusinessService.ts
import Business from '../models/businessModels';
import { UniqueConstraintError } from 'sequelize';

class BusinessService {
    async createBusiness(data: { name: string,description:string, created_at?: Date, updated_at?: Date }) {
        try {
            const business = await Business.create(data);
            return Promise.resolve(business);
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw new Error('Business name already exists');
            }
            console.error('Error creating business in service:', error);
            throw new Error('Internal Server Error');
        }
    }

    async getBusinesses(page: number = 1, limit: number = 10) {
        try {
            const offset = (page - 1) * limit;
            const businesses = await Business.findAndCountAll({
                attributes: ['id', 'name'],
                limit: limit,
                offset: offset
            });
            if (businesses.rows.length === 0) {
                throw new Error('No businesses found for the given page and limit');
            }
            return Promise.resolve({
                data: businesses.rows,
                total: businesses.count,
                page,
                limit
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getBusinessById(id: number) {
        try {
            const business = await Business.findByPk(id);
            if (business) {
                return Promise.resolve(business);
            }
            throw new Error('Business not found');
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async updateBusiness(id: number, data: { name?: string, description?:string, updated_at:Date }) {
        try {
            const business = await Business.findByPk(id);
            if (business) {
                const updatedBusiness = await business.update(data);
                return Promise.resolve(updatedBusiness);
            }
            throw new Error('Business not found');
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                return Promise.reject(new Error('Business name already exists'));
            }
            return Promise.reject(error);
        }
    }

    async deleteBusiness(id: number) {
        try {
            const business = await Business.findByPk(id);
            if (business) {
                await business.destroy();
                return Promise.resolve();
            }
            throw new Error('Business not found');
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default new BusinessService();
