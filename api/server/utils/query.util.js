import { QueryTypes } from 'sequelize';

const availSlotsQuery = (date) => `Select
lt.location_id,
lt.time_slot,
(lt.capacity - coalesce(apt.total_booked, 0)) as available_seats
from
(
    Select
        location_id,name,capacity,time_slot
    from
        locations l
        cross join (
            SELECT
                x as time_slot
            FROM
                generate_series(
                    timestamp '${date} 07:00',
                    timestamp '${date} 22:00',
                    interval '15 min'
                ) t(x)
        ) as timeseries
) as lt
Left join (
    Select
        location_id,
        appointment_time,
        sum(no_of_people) as total_booked
    From
        appointments
    Group by
        location_id,
        appointment_time
) as apt on lt.location_id = apt.location_id
and lt.time_slot = apt.appointment_time;`

const appointments = (db, date) => db.sequelize.query(availSlotsQuery(date), { type: QueryTypes.SELECT });

const isExists = (db, modelName, pk, id) => db[modelName].count({ where: { [pk]: id } })
    .then(count => {
        if (count != 0) {
            return false;
        }
        return true;
    });

export default {
    appointments,
    isExists
};