import TestResultsService from '../services/tests.service';
import Util from '../utils/response.util';

const util = new Util();

class TestResultsController {
    static async mapId(req, res) {
        const { tt_id, ts_id } = req.body;
        if (!tt_id || !ts_id) {
            util.setError(400, 'Please provide tube id and strip id');
            return util.send(res);
        }
        try {
            const mappedResponse = await TestResultsService.mapTubeAndStripId({ tt_id, ts_id });
            util.setSuccess(201, 'Tube and strip mapped', mappedResponse);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async generateId(req, res) {
        try {
            const mappedResult = await TestResultsService.generateTubeAndStripId();
            util.setSuccess(201, 'New ID generated', mappedResult);
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async validateTubeId(req, res) {
        const { tt_id } = req.params;
        if (!tt_id) {
            util.setError(400, 'Please provide test tube id');
            return util.send(res);
        }
        try {
            const tubeDetails = await TestResultsService.validateTubeId(tt_id);
            util.setSuccess(200, 'valid', tubeDetails);
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async fetchResult(req, res) {
        const { tt_id } = req.params;
        if (!tt_id) {
            util.setError(400, 'Please provide test tube id');
            return util.send(res);
        }
        try {
            const tubeDetail = await TestResultsService.fetchResult(tt_id);
            if (tubeDetail)
                util.setSuccess(200, 'Result retrieved', tubeDetail);
            else
                util.setError(404, 'Not found');
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async uploadResults(req, res) {
        const { is_positive } = req.body;
        const { ts_id } = req.params;
        if (!ts_id || is_positive == undefined) {
            util.setError(400, 'Please provide test strip id and test result');
            return util.send(res);
        }
        try {
            const testResult = await TestResultsService.uploadResults({ is_positive, ts_id });
            if (testResult)
                util.setSuccess(200, 'Test Result updated', testResult);
            else
                util.setError(404, 'Not found');
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }
}

export default TestResultsController;