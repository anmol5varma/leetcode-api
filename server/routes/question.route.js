import { Router } from 'express';
import QuestionController from '../controllers/question.controller';

const router = Router();

router.get('/all', QuestionController.getAllQuestions);
router.get('', QuestionController.getQuestions);

export default router;
