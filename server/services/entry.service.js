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

    return entries.map(entry => entry.get()).map(({ id, ...entry }) => ({
      entry
    }));
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

  // static async updatePassword({ username, password }) {
  //   const saltLength = Number(process.env.SALT_LENGTH);
  //   const userToUpdate = await database.user.findOne({
  //     where: { username }
  //   });

  //   if (userToUpdate) {
  //     const salt = genRandomString(saltLength);
  //     await database.user.update(
  //       { password: getSha256(password, salt), salt },
  //       { where: { username } }
  //     );
  //     return {
  //       username: userToUpdate.username,
  //     };
  //   }
  //   return null;
  // }

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
