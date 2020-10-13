import randomize from 'randomatic';
import database from '../models';
import queries from '../utils/query.util'

const CODE_LENGTH = 8;

const generateUniqueId = async (prefix, modelName, pk) => {
    let isUnique = false;
    let id;
    while (!isUnique) {
        id = `${prefix}-${randomize('A0', CODE_LENGTH)}`;
        isUnique = !(await queries.isExists(database, modelName, pk, id));
    }
    return id;
}

class AppointmentService {
    static async generateTubeAndStripId() {
        try {
            const testTube = await database.testtube.create({ tt_id: await generateUniqueId('T', 'testtube', 'tt_id') })
            const testStrip = await database.teststrip.create({ ts_id: await generateUniqueId('S', 'teststrip', 'ts_id') })
            return ([{ tt_id: testTube.tt_id, ts_id: testStrip.ts_id }])
        } catch (error) {
            throw error;
        }
    }

    static async mapTubeAndStripId({ tt_id, ts_id }) {
        try {
            const isValidTubeId = await queries.isExists(database, 'testtube', 'tt_id', tt_id);
            const isValidStripId = await queries.isExists(database, 'teststrip', 'ts_id', ts_id);
            if (isValidTubeId) {
                if (isValidStripId) {
                    return await database.test_result.create({ tt_id, ts_id });
                } else
                    throw new Error('Invalid strip id');
            } else
                throw new Error('Invalid tube id');

        } catch (error) {
            throw error;
        }
    }

    static async validateTubeId(tt_id) {
        try {
            return await queries.isExists(database, 'testtube', 'tt_id', tt_id) && !await queries.isExists(database, 'test_result', 'tt_id', tt_id);

        } catch (error) {
            throw error;
        }
    }
    static async fetchResult(tt_id) {
        try {
            return await database.test_result.findOne({ where: { tt_id } });
        } catch (error) {
            throw error;
        }
    }

    static async uploadResults({ ts_id, is_positive }) {
        try {
            const result = await database.test_result.findOne({ where: { ts_id } });
            if (result) {
                return await result.update({ is_positive, result_time: new Date() });
            }
            throw new Error('Strip  id does not exist');
        } catch (error) {
            throw error;
        }
    }
}

export default AppointmentService;