import { Router } from 'express';
import EntryController from '../controllers/entry.controller';

const router = Router();

router.get('', EntryController.getEntries);
router.get('/:transactionId', EntryController.getEntryDetails);
router.post('/', EntryController.addEntry);
// router.put('/password', EntryController.updatePassword);
// router.delete('/', EntryController.deleteUser);

export default router;
