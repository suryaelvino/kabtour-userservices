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
exports.deleteTenant = exports.updateTenant = exports.getTenantById = exports.getTenants = exports.createTenant = void 0;
const tenant_1 = __importDefault(require("../models/tenant"));
const createTenant = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return tenant_1.default.create(data);
});
exports.createTenant = createTenant;
const getTenants = () => __awaiter(void 0, void 0, void 0, function* () {
    return tenant_1.default.findAll({
        attributes: ['id', 'name', 'app_name']
    });
});
exports.getTenants = getTenants;
const getTenantById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return tenant_1.default.findByPk(id);
});
exports.getTenantById = getTenantById;
const updateTenant = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const tenant = yield tenant_1.default.findByPk(id);
    if (tenant) {
        return tenant.update(data);
    }
    throw new Error('Tenant not found');
});
exports.updateTenant = updateTenant;
const deleteTenant = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tenant = yield tenant_1.default.findByPk(id);
    if (tenant) {
        yield tenant.destroy();
    }
    else {
        throw new Error('Tenant not found');
    }
});
exports.deleteTenant = deleteTenant;
