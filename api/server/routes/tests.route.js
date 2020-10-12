import { Router } from 'express';
import TestResultsController from '../controllers/tests.controller';

const router = Router();

router.post('', TestResultsController.mapId);
router.post('/generateids', TestResultsController.generateId);
router.get('/tube/:tt_id/validate', TestResultsController.validateTubeId);
router.get('/tube/:tt_id', TestResultsController.fetchResult);
router.put('', TestResultsController.uploadResults);

export default router;