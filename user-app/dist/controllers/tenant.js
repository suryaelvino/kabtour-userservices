"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTenant = exports.updateTenant = exports.getTenantById = exports.getTenants = exports.createTenant = void 0;
const tenantService = __importStar(require("../services/tenant"));
const createTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, email, app_name } = req.body;
    const created_at = new Date;
    const update_at = new Date;
    try {
        const tenant = yield tenantService.createTenant({ name, description, email, app_name, created_at, update_at });
        res.status(201).json({ data: tenant });
    }
    catch (error) {
        console.error('Error creating tenant:', error);
        res.status(500).json({ error: 'Error creating tenant' });
    }
});
exports.createTenant = createTenant;
const getTenants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tenants = yield tenantService.getTenants();
        res.status(200).json({ data: tenants });
    }
    catch (error) {
        console.error('Error fetching tenants:', error);
        res.status(500).json({ error: 'Error fetching tenants' });
    }
});
exports.getTenants = getTenants;
const getTenantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const tenant = yield tenantService.getTenantById(Number(id));
        if (tenant) {
            res.status(200).json(tenant);
        }
        else {
            res.status(404).json({ error: 'Tenant not found' });
        }
    }
    catch (error) {
        console.error('Error fetching tenant:', error);
        res.status(500).json({ error: 'Error fetching tenant' });
    }
});
exports.getTenantById = getTenantById;
const updateTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, email, app_name } = req.body;
    const update_at = new Date;
    try {
        const tenant = yield tenantService.updateTenant(Number(id), { name, description, email, app_name, update_at });
        res.status(200).json(tenant);
    }
    catch (error) {
        console.error('Error updating tenant:', error);
        if (error.message === 'Tenant not found') {
            res.status(404).json({ error: 'Tenant not found' });
        }
        else {
            res.status(500).json({ error: 'Error updating tenant' });
        }
    }
});
exports.updateTenant = updateTenant;
const deleteTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield tenantService.deleteTenant(Number(id));
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting tenant:', error);
        if (error.message === 'Tenant not found') {
            res.status(404).json({ error: 'Tenant not found' });
        }
        else {
            res.status(500).json({ error: 'Error deleting tenant' });
        }
    }
});
exports.deleteTenant = deleteTenant;
