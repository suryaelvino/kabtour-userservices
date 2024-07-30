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
// services/BusinessService.ts
const businessModels_1 = __importDefault(require("../models/businessModels"));
const sequelize_1 = require("sequelize");
class BusinessService {
    createBusiness(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const business = yield businessModels_1.default.create(data);
                return Promise.resolve(business);
            }
            catch (error) {
                if (error instanceof sequelize_1.UniqueConstraintError) {
                    throw new Error('Business name already exists');
                }
                console.error('Error creating business in service:', error);
                throw new Error('Internal Server Error');
            }
        });
    }
    getBusinesses() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            try {
                const offset = (page - 1) * limit;
                const businesses = yield businessModels_1.default.findAndCountAll({
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
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    getBusinessById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const business = yield businessModels_1.default.findByPk(id);
                if (business) {
                    return Promise.resolve(business);
                }
                throw new Error('Business not found');
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    updateBusiness(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const business = yield businessModels_1.default.findByPk(id);
                if (business) {
                    const updatedBusiness = yield business.update(data);
                    return Promise.resolve(updatedBusiness);
                }
                throw new Error('Business not found');
            }
            catch (error) {
                if (error instanceof sequelize_1.UniqueConstraintError) {
                    return Promise.reject(new Error('Business name already exists'));
                }
                return Promise.reject(error);
            }
        });
    }
    deleteBusiness(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const business = yield businessModels_1.default.findByPk(id);
                if (business) {
                    yield business.destroy();
                    return Promise.resolve();
                }
                throw new Error('Business not found');
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
}
exports.default = new BusinessService();
