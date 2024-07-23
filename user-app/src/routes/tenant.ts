import { Router } from 'express';
import TenantController from '../controllers/tenant';
import { validateTenantInput } from '../middleware/tenant';

class TenantRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', validateTenantInput, TenantController.createTenant.bind(TenantController));
        this.router.get('/',  TenantController.getTenants.bind(TenantController));
        this.router.get('/:id', TenantController.getTenantById.bind(TenantController));
        this.router.put('/:id',validateTenantInput, TenantController.updateTenant.bind(TenantController));
        this.router.delete('/:id', TenantController.deleteTenant.bind(TenantController));
    }
}

export default new TenantRoutes().router;
