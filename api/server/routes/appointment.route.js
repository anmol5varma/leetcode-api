import { Router } from 'express';
import AppointmentController from '../controllers/appointment.controller';

const router = Router();

router.get('/slots', AppointmentController.getAvailableSlots);
router.post('/', AppointmentController.bookAppointment);
router.post('/validate', AppointmentController.getAppointmentDetails);

export default router;