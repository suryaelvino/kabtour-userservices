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
const tenantModels_1 = __importDefault(require("../models/tenantModels"));
const businessModels_1 = __importDefault(require("../models/businessModels"));
const sequelize_1 = require("sequelize");
class TenantService {
    createTenant(data) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (data.business) {
                    const validBusinesses = yield businessModels_1.default.findAll({
                        where: {
                            id: data.business
                        }
                    });
                    const validBusinessIds = validBusinesses.map(b => b.id);
                    if (validBusinessIds.length !== data.business.length) {
                        return reject(new Error('Some business IDs are invalid'));
                    }
                }
                const tenant = yield tenantModels_1.default.create(data);
                resolve(tenant);
            }
            catch (error) {
                if (error instanceof sequelize_1.UniqueConstraintError) {
                    if (error.errors.some(e => e.path === 'name')) {
                        return reject(new Error('Tenant name already exists'));
                    }
                    if (error.errors.some(e => e.path === 'email')) {
                        return reject(new Error('Tenant email already exists'));
                    }
                }
                reject(new Error('Error creating tenant: ' + error.message));
            }
        }));
    }
    getTenants(page = 1, limit = 10) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const offset = (page - 1) * limit;
                const tenants = yield tenantModels_1.default.findAndCountAll({
                    attributes: ['id', 'name', 'app_name', 'business'],
                    limit: limit,
                    offset: offset
                });
                if (tenants.rows.length === 0) {
                    return reject(new Error('No tenants found for the given page and limit'));
                }
                resolve({
                    data: tenants.rows,
                    total: tenants.count,
                    page,
                    limit
                });
            }
            catch (error) {
                reject(new Error('Error fetching tenants: ' + error.message));
            }
        }));
    }
    getTenantById(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tenant = yield tenantModels_1.default.findByPk(id);
                if (!tenant) {
                    return reject(new Error('Tenant not found'));
                }
                const businessIds = tenant.business;
                const businesses = yield businessModels_1.default.findAll({
                    where: {
                        id: businessIds
                    },
                    attributes: ['id', 'name']
                });
                const businessDetails = businesses.map(b => ({
                    id: b.id,
                    name: b.name
                }));
                const tenantData = tenant.toJSON();
                delete tenantData.business;
                resolve(Object.assign(Object.assign({}, tenantData), { business: businessDetails }));
            }
            catch (error) {
                reject(new Error('Error fetching tenant: ' + error.message));
            }
        }));
    }
    updateTenant(id, data) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tenant = yield tenantModels_1.default.findByPk(id);
                if (!tenant) {
                    return reject(new Error('Tenant not found'));
                }
                if (data.business) {
                    const validBusinesses = yield businessModels_1.default.findAll({
                        where: {
                            id: data.business
                        }
                    });
                    const validBusinessIds = validBusinesses.map(b => b.id);
                    if (validBusinessIds.length !== data.business.length) {
                        return reject(new Error('Some business IDs are invalid'));
                    }
                }
                const updatedTenant = yield tenant.update(data);
                resolve(updatedTenant);
            }
            catch (error) {
                if (error instanceof sequelize_1.UniqueConstraintError) {
                    if (error.errors.some(e => e.path === 'name')) {
                        return reject(new Error('Tenant name already exists'));
                    }
                    if (error.errors.some(e => e.path === 'email')) {
                        return reject(new Error('Tenant email already exists'));
                    }
                }
                reject(new Error('Error updating tenant: ' + error.message));
            }
        }));
    }
    deleteTenant(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tenant = yield tenantModels_1.default.findByPk(id);
                if (!tenant) {
                    return reject(new Error('Tenant not found'));
                }
                yield tenant.destroy();
                resolve();
            }
            catch (error) {
                reject(new Error('Error deleting tenant: ' + error.message));
            }
        }));
    }
}
exports.default = new TenantService();
