import EntryService from '../services/entry.service';

class EntryController {
  static async getEntries(req, res) {
    const entries = await EntryService.getEntries(req.query);
    return res.status(200).json(entries);
  }

  static async getEntryDetails(req, res) {
    const { transactionId } = req.params;
    const entry = await EntryService.getEntryDetails({ transactionId });
    return res.status(200).json(entry);
  }

  static async addEntry(req, res) {
    const newEntry = req.body;
    const createdEntry = await EntryService.addEntry(newEntry);
    return res.status(201).json(createdEntry);
  }

  static async bulkUpload(req, res) {
    const list = req.body;
    const uploadedEntries = await EntryService.bulkUpload(list);
    return res.status(201).json(uploadedEntries);
  }

  static async updateEntry(req, res) {
    const entry = req.body;
    const updatedEntry = await EntryService.updateEntry(entry);
    if (!updatedEntry) {
      return res.status(400).json('Bad request');
    }
    return res.status(200).json(updatedEntry);
  }

  static async deleteEntry(req, res) {
    const { transactionId } = req.params;
    const updatedEntry = await EntryService.deleteEntry(transactionId);
    if (!updatedEntry) {
      return res.status(400).json('Bad request');
    }
    return res.status(200).json({ transactionId });
  }

  // static async updatePassword(req, res) {
  //   const data = req.body;
  //   try {
  //     const updateUser = await EntryService.updatePassword(data);
  //     if (!updateUser) {
  //       return res.status(400).json('Bad request');
  //     }
  //     return res.status(200).json(updateUser);
  //   } catch (error) {
  //     console.error(`${req.id} - ${error}`);
  //     return res.status(500).json('Unexpected error');
  //   }
  // }

  // static async deleteUser(req, res) {
  //   const data = req.body;
  //   try {
  //     const userToDelete = await EntryService.deleteUser(data);
  //     if (!userToDelete) {
  //       return res.status(400).json('Bad request');
  //     }
  //     return res.status(200).json(userToDelete);
  //   } catch (error) {
  //     console.error(`${req.id} - ${error}`);
  //     return res.status(500).json('Unexpected error');
  //   }
  // }
}

export default EntryController;
