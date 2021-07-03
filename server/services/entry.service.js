import config from 'dotenv';
import database from '../models';
import { generateUniqueTransactionId } from '../utils/db.utils';

config.config();

class EntryService {
  static async getEntries(query) {
    let entries;
    if (query) {
      entries = await database.entry.findAll({ where: query });
    } else {
      entries = await database.entry.findAll();
    }
    return entries.map(entry => entry.get()).map(({ id, ...entry }) => entry);
  }

  static async getEntryDetails({ transactionId }) {
    const entry = await database.entry.findOne({ where: { transactionId }, include: 'section' });
    if (entry === null)
      return null;
    const { id, ...result } = entry.get();
    return result;
  }

  static async addEntry(entry) {
    const transactionId = await generateUniqueTransactionId({ shortHand: entry.sectionShortHand, models: database })
    const newSeqEntry = await database.entry.create({ ...entry, transactionId });
    const { id, ...newEntry } = newSeqEntry.get();
    return newEntry;
  }

  static async updateEntry(entry) {
    const updatedSeqObj = await database.entry.update(
      entry,
      { where: { transactionId: entry.transactionId } }
    );
    if (!updatedSeqObj[0])
      return null;
    return entry;
  }

  // static async deleteUser({ username }) {
  //   const userToDelete = await database.user.findOne({ where: { username } });

  //   if (userToDelete) {
  //     const deletedBook = await database.user.destroy({
  //       where: { username }
  //     });
  //     return deletedBook;
  //   }
  //   return null;
  // }
}

export default EntryService;
