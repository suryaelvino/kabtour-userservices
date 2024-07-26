// routes/businessRoutes.ts
import { Router } from 'express';
import BusinessController from '../controllers/businessControllers';

class BusinessRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', BusinessController.createBusiness.bind(BusinessController));
        this.router.get('/', BusinessController.getBusinesses.bind(BusinessController));
        this.router.get('/:id', BusinessController.getBusinessById.bind(BusinessController));
        this.router.put('/:id', BusinessController.updateBusiness.bind(BusinessController));
        this.router.delete('/:id', BusinessController.deleteBusiness.bind(BusinessController));
    }
}

export default new BusinessRoutes().router;
