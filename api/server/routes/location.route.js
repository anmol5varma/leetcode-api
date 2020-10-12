import { Router } from 'express';
import LocationController from '../controllers/location.controller';

const router = Router();

router.get('', LocationController.getAllLocations);
router.post('/', LocationController.addLocation);
router.get('/:id', LocationController.getALocation);
router.put('/:id', LocationController.updateLocation);
router.delete('/:id', LocationController.deleteLocation);

export default router;