import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/userServices';

class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const userData = req.body;
            const user = await UserService.createUser(userData);
            res.status(StatusCodes.CREATED).json(user);
        } catch (error:any) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.id, 10);
            const user = await UserService.getUserById(userId);
            res.status(StatusCodes.OK).json(user);
        } catch (error:any) {
            res.status(StatusCodes.NOT_FOUND).json({ message: error.message }); // 404 Not Found
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.id, 10);
            const userData = req.body;
            const updatedUser = await UserService.updateUser(userId, userData);
            res.status(StatusCodes.OK).json(updatedUser);
        } catch (error:any) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: error.message }); // 400 Bad Request
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.id, 10);
            await UserService.deleteUser(userId);
            res.status(StatusCodes.NO_CONTENT).send();
        } catch (error:any) {
            res.status(StatusCodes.NOT_FOUND).json({ message: error.message }); // 404 Not Found
        }
    }

    async getSuperAdminUsers(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string, 10) || 1;
            const limit = parseInt(req.query.limit as string, 10) || 10;
            const filters: any = {
                new_user: req.query.new_user === 'true' ? true : undefined,
                tenant_id: req.query.tenant_id ? parseInt(req.query.tenant_id as string, 10) : undefined
            };
            const users = await UserService.getAllUsers(page, limit, filters);
            res.status(StatusCodes.OK).json(users);
        } catch (error:any) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: error.message }); // 400 Bad Request
        }
    }

    async getAdminUsers(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string, 10) || 1;
            const limit = parseInt(req.query.limit as string, 10) || 10;
            const filters: any = {
                role: 'admin',
                tenant_id: req.query.tenant_id ? parseInt(req.query.tenant_id as string, 10) : undefined
            };
            const users = await UserService.getAllUsers(page, limit, filters);
            res.status(StatusCodes.OK).json(users);
        } catch (error:any) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: error.message }); // 400 Bad Request
        }
    }

    async getPartners(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string, 10) || 1;
            const limit = parseInt(req.query.limit as string, 10) || 10;
            const filters: any = {
                role: 'partner',
                tenant_id: req.query.tenant_id ? parseInt(req.query.tenant_id as string, 10) : undefined
            };
            const users = await UserService.getAllUsers(page, limit, filters);
            res.status(StatusCodes.OK).json(users);
        } catch (error:any) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: error.message }); // 400 Bad Request
        }
    }

    async getTravelers(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string, 10) || 1;
            const limit = parseInt(req.query.limit as string, 10) || 10;
            const filters: any = {
                role: 'travelers',
                tenant_id: req.query.tenant_id ? parseInt(req.query.tenant_id as string, 10) : undefined
            };
            const users = await UserService.getAllUsers(page, limit, filters);
            res.status(StatusCodes.OK).json(users);
        } catch (error:any) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: error.message }); // 400 Bad Request
        }
    }

    async getAllPartnerAndTraveler(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string, 10) || 1;
            const limit = parseInt(req.query.limit as string, 10) || 10;
            const filters: any = {
                role: ['partner', 'travelers'],
                tenant_id: req.query.tenant_id ? parseInt(req.query.tenant_id as string, 10) : undefined
            };
            const users = await UserService.getAllUsers(page, limit, filters);
            res.status(StatusCodes.OK).json(users);
        } catch (error:any) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: error.message }); // 400 Bad Request
        }
    }

    async verifyUser(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.id, 10);
            const verifiedUser = await UserService.verifyUser(userId);
            res.status(StatusCodes.OK).json(verifiedUser);
        } catch (error:any) {
            res.status(StatusCodes.NOT_FOUND).json({ message: error.message }); // 404 Not Found
        }
    }
}

export default new UserController();
