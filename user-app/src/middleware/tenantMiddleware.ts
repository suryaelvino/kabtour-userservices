import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateTenantInput = [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('app_name').notEmpty().withMessage('App name is required'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
