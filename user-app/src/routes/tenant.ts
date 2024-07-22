import { Router } from 'express';
import { createTenant, getTenants, getTenantById, updateTenant, deleteTenant } from '../controllers/tenant';
import { validateTenantInput } from '../middleware/tenant';
const router = Router();

router.post('/', validateTenantInput,createTenant);
router.get('/',validateTenantInput, getTenants);
router.get('/:id', getTenantById);
router.put('/:id', updateTenant);
router.delete('/:id', deleteTenant);

export default router;
