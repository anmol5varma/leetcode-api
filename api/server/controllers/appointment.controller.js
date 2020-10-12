import AppointmentService from '../services/appointment.service';
import Util from '../utils/response.util';

const util = new Util();

class AppointmentController {
  static async getAvailableSlots(req, res) {
    try {
      const allSlots = await AppointmentService.getAvailableSlots(req.query.date);
      if (allSlots.length > 0) {
        util.setSuccess(200, 'Available slots', allSlots);
      } else {
        util.setSuccess(200, 'No slot found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async bookAppointment(req, res) {
    if (!req.body.location_id || !req.body.date || !req.body.time || !req.body.no_of_people) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newAppointment = req.body;
    try {
      const bookedAppointment = await AppointmentService.bookAppointment(newAppointment);
      util.setSuccess(201, 'Appointment booked!', bookedAppointment);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async getAppointmentDetails(req, res) {
    if (!req.body.location_id || !req.body.appointment_id) {
      util.setError(400, 'Please provide booking id and location id');
      return util.send(res);
    }
    try {
      const appointmentDetails = await AppointmentService.getAppointmentDetails(req.body);
      util.setSuccess(200, 'valid', appointmentDetails);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }
}

export default AppointmentController;