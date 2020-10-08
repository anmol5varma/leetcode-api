import database from '../src/models';

class LocationService {
  static async getAllLocations() {
    try {
      return await database.locations.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addLocation(newLocation) {
    try {
      return await database.locations.create(newLocation);
    } catch (error) {
      throw error;
    }
  }

  static async updateLocation(id, updateLocation) {
    try {
      const bookToUpdate = await database.locations.findOne({
        where: { location_id: Number(id) }
      });

      if (bookToUpdate) {
        await database.locations.update(updateLocation, { where: { location_id: Number(id) } });

        return updateLocation;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getALocation(id) {
    try {
      const location = await database.locations.findOne({
        where: { location_id: Number(id) }
      });

      return location;
    } catch (error) {
      throw error;
    }
  }

  static async deleteLocation(id) {
    try {
      const locationToDelete = await database.locations.findOne({ where: { location_id: Number(id) } });

      if (locationToDelete) {
        const deletedBook = await database.locations.destroy({
          where: { location_id: Number(id) }
        });
        return deletedBook;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default LocationService;