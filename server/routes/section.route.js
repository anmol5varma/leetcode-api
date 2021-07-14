import { Router } from 'express';
import SectionController from '../controllers/section.controller';

const router = Router();

router.get('/market', SectionController.getMarketData);
router.get('/list', SectionController.getSectionList);
router.get('/:shortHand', SectionController.getSectionDetails);
router.get('', SectionController.getAllSections);
router.post('', SectionController.addSection);
router.put('', SectionController.updateSection);
// router.delete('/', SectionController.deleteUser);

export default router;
