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
const businessServices_1 = __importDefault(require("../services/businessServices"));
const http_status_codes_1 = require("http-status-codes");
class BusinessController {
    createBusiness(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description } = req.body;
            const created_at = new Date();
            const updated_at = new Date();
            try {
                const business = yield businessServices_1.default.createBusiness({ name, description, created_at, updated_at });
                return res.status(http_status_codes_1.StatusCodes.CREATED).json({ data: business });
            }
            catch (error) {
                console.error('Error creating business:', error);
                if (error.message === 'Business name already exists') {
                    return res.status(http_status_codes_1.StatusCodes.CONFLICT).json({ error: error.message });
                }
                return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error creating business' });
            }
        });
    }
    getBusinesses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 10;
            try {
                const result = yield businessServices_1.default.getBusinesses(page, limit);
                return res.status(http_status_codes_1.StatusCodes.OK).json(result);
            }
            catch (error) {
                console.error('Error fetching businesses:', error);
                if (error.message === 'No businesses found for the given page and limit') {
                    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: error.message });
                }
                else {
                    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error fetching businesses' });
                }
            }
        });
    }
    getBusinessById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const business = yield businessServices_1.default.getBusinessById(Number(id));
                if (business) {
                    return res.status(http_status_codes_1.StatusCodes.OK).json(business);
                }
                else {
                    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: 'Business not found' });
                }
            }
            catch (error) {
                console.error('Error fetching business:', error);
                return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error fetching business' });
            }
        });
    }
    updateBusiness(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, description } = req.body;
            const updated_at = new Date;
            try {
                const business = yield businessServices_1.default.updateBusiness(Number(id), { name, description, updated_at });
                return res.status(http_status_codes_1.StatusCodes.OK).json(business);
            }
            catch (error) {
                console.error('Error updating business:', error);
                if (error.message === 'Business not found') {
                    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: error.message });
                }
                else if (error.message === 'Business name already exists') {
                    return res.status(http_status_codes_1.StatusCodes.CONFLICT).json({ error: error.message });
                }
                else {
                    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error updating business' });
                }
            }
        });
    }
    deleteBusiness(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield businessServices_1.default.deleteBusiness(Number(id));
                return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
            }
            catch (error) {
                console.error('Error deleting business:', error);
                if (error.message === 'Business not found') {
                    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: error.message });
                }
                else {
                    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error deleting business' });
                }
            }
        });
    }
}
exports.default = new BusinessController();
