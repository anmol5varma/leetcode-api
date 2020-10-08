import LocationService from '../services/location.service';
import Util from '../utils/response.util';

const util = new Util();

class LocationController {
  static async getAllLocations(req, res) {
    try {
      const allLocations = await LocationService.getAllLocations();
      if (allLocations.length > 0) {
        util.setSuccess(200, 'Locations retrieved', allLocations);
      } else {
        util.setSuccess(200, 'No location found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addLocation(req, res) {
    if (!req.body.title || !req.body.price || !req.body.description) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newLocation = req.body;
    try {
      const createdLocation = await LocationService.addLocation(newLocation);
      util.setSuccess(201, 'Location Added!', createdLocation);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updateLocation(req, res) {
    const alteredLocation = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updateLocation = await LocationService.updateLocation(id, alteredLocation);
      if (!updateLocation) {
        util.setError(404, `Cannot find location with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Location updated', updateLocation);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getALocation(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const theLocation = await LocationService.getALocation(id);

      if (!theLocation) {
        util.setError(404, `Cannot find location with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Location', theLocation);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteLocation(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const locationToDelete = await LocationService.deleteLocation(id);

      if (locationToDelete) {
        util.setSuccess(200, 'Location deleted');
      } else {
        util.setError(404, `Location with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default LocationController;