"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tenantControllers_1 = __importDefault(require("../controllers/tenantControllers"));
const tenantMiddleware_1 = require("../middleware/tenantMiddleware");
class TenantRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/', tenantMiddleware_1.validateTenantInput, tenantControllers_1.default.createTenant.bind(tenantControllers_1.default));
        this.router.get('/', tenantControllers_1.default.getTenants.bind(tenantControllers_1.default));
        this.router.get('/:id', tenantControllers_1.default.getTenantById.bind(tenantControllers_1.default));
        this.router.put('/:id', tenantMiddleware_1.validateTenantInput, tenantControllers_1.default.updateTenant.bind(tenantControllers_1.default));
        this.router.delete('/:id', tenantControllers_1.default.deleteTenant.bind(tenantControllers_1.default));
    }
}
exports.default = new TenantRoutes().router;
