import { Router } from 'express';
import SectionController from '../controllers/section.controller';

const router = Router();

router.get('', SectionController.getAllSections);
router.get('/list', SectionController.getSectionList);
router.get('/:shortHand', SectionController.getSectionDetails);
router.post('', SectionController.addSection);
router.put('', SectionController.updateSection);
// router.delete('/', SectionController.deleteUser);

export default router;
