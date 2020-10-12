import randomize from 'randomatic';
import database from '../models';
import queries from '../utils/query.util'

const CODE_LENGTH = 8;

const generateUniqueId = async () => {
  let isUnique = false;
  let id;
  while (!isUnique) {
    id = `P-${randomize('A0', CODE_LENGTH)}`;
    isUnique = !(await queries.isExists(database, 'appointments', 'appointment_id', id));
  }
  return id;
}

class AppointmentService {
  static async getAvailableSlots(date) {
    try {
      return await queries.appointments(database, date)
    } catch (error) {
      throw error;
    }
  }

  static async bookAppointment({ date, time, location_id, no_of_people }) {
    try {
      const location = await database.locations.findOne({
        where: { location_id: Number(location_id) }
      });
      const bookedList = await database.appointments.findAll({
        where: { location_id: Number(location_id), appointment_time: new Date(`${date} ${time}`) }
      });
      if (no_of_people <= location.capacity - bookedList.reduce((acc, curr) => acc + curr.no_of_people, 0)) {
        const appointment = {};
        appointment.location_id = location_id;
        appointment.no_of_people = no_of_people;
        appointment.scan_count = 0;
        appointment.appointment_time = new Date(`${date} ${time}`);
        appointment.appointment_id = await generateUniqueId();
        return await database.appointments.create(appointment);
      } else {
        throw new Error('Slot is full. Please choose a different slot')
      }
    } catch (error) {
      throw error;
    }
  }

  static async getAppointmentDetails({ appointment_id, location_id }) {
    try {
      const appointment = await database.appointments.findOne({
        where: { appointment_id },
      });
      if (appointment) {
        if (appointment.location_id === location_id) {
          if (appointment.scan_count < 2) {
            return await appointment.update({
              scan_count: appointment.scan_count + 1,
              checkin_time: new Date()
            });
          } else {
            throw new Error('scanned too many times')
          }
        } else {
          throw new Error('wrong location')
        }
      } else {
        throw new Error('Invalid appointment id')
      }
    } catch (error) {
      throw error;
    }
  }
}

export default AppointmentService;