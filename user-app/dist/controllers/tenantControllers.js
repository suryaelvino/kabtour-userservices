"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tenantServices_1 = __importDefault(require("../services/tenantServices"));
const http_status_codes_1 = require("http-status-codes");
class TenantController {
    createTenant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, email, app_name, business } = req.body;
            try {
                const tenant = yield tenantServices_1.default.createTenant({
                    name,
                    description,
                    email,
                    app_name,
                    business,
                    created_at: new Date(),
                    updated_at: new Date()
                });
                return res.status(http_status_codes_1.StatusCodes.CREATED).json({ data: tenant });
            }
            catch (error) {
                console.error('Error creating tenant:', error);
                if (error instanceof Error) {
                    if (error.message.includes('name already exists')) {
                        return res.status(http_status_codes_1.StatusCodes.CONFLICT).json({ error: 'Tenant name already exists' });
                    }
                    if (error.message.includes('email already exists')) {
                        return res.status(http_status_codes_1.StatusCodes.CONFLICT).json({ error: 'Tenant email already exists' });
                    }
                    if (error.message.includes('Some business IDs are invalid')) {
                        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: 'Invalid business IDs' });
                    }
                }
                return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error creating tenant' });
            }
        });
    }
    getTenants(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 10;
            try {
                const result = yield tenantServices_1.default.getTenants(page, limit);
                return res.status(http_status_codes_1.StatusCodes.OK).json({ data: result });
            }
            catch (error) {
                console.error('Error fetching tenants:', error);
                if (error instanceof Error && error.message === 'No tenants found for the given page and limit') {
                    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: 'No tenants found for the given page and limit' });
                }
                return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error fetching tenants' });
            }
        });
    }
    getTenantById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const tenant = yield tenantServices_1.default.getTenantById(Number(id));
                return res.status(http_status_codes_1.StatusCodes.OK).json(tenant);
            }
            catch (error) {
                console.error('Error fetching tenant:', error);
                if (error instanceof Error && error.message === 'Tenant not found') {
                    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: 'Tenant not found' });
                }
                return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error fetching tenant' });
            }
        });
    }
    updateTenant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, description, email, app_name, business } = req.body;
            try {
                const tenant = yield tenantServices_1.default.updateTenant(Number(id), {
                    name,
                    description,
                    email,
                    app_name,
                    business,
                    updated_at: new Date()
                });
                return res.status(http_status_codes_1.StatusCodes.OK).json(tenant);
            }
            catch (error) {
                console.error('Error updating tenant:', error);
                if (error instanceof Error) {
                    if (error.message.includes('name already exists')) {
                        return res.status(http_status_codes_1.StatusCodes.CONFLICT).json({ error: 'Tenant name already exists' });
                    }
                    if (error.message.includes('email already exists')) {
                        return res.status(http_status_codes_1.StatusCodes.CONFLICT).json({ error: 'Tenant email already exists' });
                    }
                    if (error.message === 'Tenant not found') {
                        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: 'Tenant not found' });
                    }
                    if (error.message.includes('Some business IDs are invalid')) {
                        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: 'Invalid business IDs' });
                    }
                }
                return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error updating tenant' });
            }
        });
    }
    deleteTenant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield tenantServices_1.default.deleteTenant(Number(id));
                return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
            }
            catch (error) {
                console.error('Error deleting tenant:', error);
                if (error instanceof Error && error.message === 'Tenant not found') {
                    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: 'Tenant not found' });
                }
                return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error deleting tenant' });
            }
        });
    }
}
exports.default = new TenantController();
