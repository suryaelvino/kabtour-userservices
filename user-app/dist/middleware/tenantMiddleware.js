"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTenantInput = void 0;
const express_validator_1 = require("express-validator");
exports.validateTenantInput = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('description').notEmpty().withMessage('Description is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Email is invalid'),
    (0, express_validator_1.body)('app_name').notEmpty().withMessage('App name is required'),
    (0, express_validator_1.body)('business').notEmpty().withMessage('Business is required'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
