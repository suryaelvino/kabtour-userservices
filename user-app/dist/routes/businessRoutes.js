"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/businessRoutes.ts
const express_1 = require("express");
const businessControllers_1 = __importDefault(require("../controllers/businessControllers"));
class BusinessRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/', businessControllers_1.default.createBusiness.bind(businessControllers_1.default));
        this.router.get('/', businessControllers_1.default.getBusinesses.bind(businessControllers_1.default));
        this.router.get('/:id', businessControllers_1.default.getBusinessById.bind(businessControllers_1.default));
        this.router.put('/:id', businessControllers_1.default.updateBusiness.bind(businessControllers_1.default));
        this.router.delete('/:id', businessControllers_1.default.deleteBusiness.bind(businessControllers_1.default));
    }
}
exports.default = new BusinessRoutes().router;
