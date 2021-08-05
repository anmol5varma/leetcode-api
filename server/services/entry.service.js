import config from 'dotenv';
import { Op } from 'sequelize';
import database from '../models';
import { generateUniqueTransactionId } from '../utils/db.utils';

config.config();

class EntryService {
  static async getEntries(query) {
    let entries;
    if (query) {
      const { type, ...tempQuery } = query;
      if (!!type || ['buy', 'sell'].includes(type)) {
        tempQuery.quantity = query.type === 'buy' ? { [Op.gt]: 0 } : { [Op.lt]: 0 };
      }
      entries = await database.entry.findAll({
        where: tempQuery,
        order: [
          ['updatedAt', 'DESC']]
      });
    } else {
      entries = await database.entry.findAll();
    }
    return entries.map((entry) => entry.get()).map(({ id, ...entry }) => entry);
  }

  static async getEntryDetails({ transactionId }) {
    const entry = await database.entry.findOne({ where: { transactionId }, include: 'section' });
    if (entry === null) { return null; }
    const { id, ...result } = entry.get();
    return result;
  }

  static async addEntry(entry) {
    const transactionId = await generateUniqueTransactionId(
      { shortHand: entry.sectionShortHand, models: database }
    );
    const newSeqEntry = await database.entry.create({ ...entry, transactionId });
    const { id, ...newEntry } = newSeqEntry.get();
    return newEntry;
  }

  static async bulkUpload(list) {
    let idList = [];
    const listWithId = await Promise.all(list.map(async (e) => {
      const transactionId = await generateUniqueTransactionId(
        { shortHand: e.sectionShortHand, models: database },
        idList
      );
      idList = idList.concat(transactionId);
      return { ...e, transactionId };
    }));
    const newSeqEntry = await database.entry.bulkCreate(listWithId, { returning: true });
    return newSeqEntry.map(({ id, ...newEntry }) => newEntry);
  }

  static async updateEntry(entry) {
    const updatedSeqObj = await database.entry.update(
      entry,
      { where: { transactionId: entry.transactionId } }
    );
    if (!updatedSeqObj[0]) { return null; }
    return entry;
  }

  static async deleteEntry(transactionId) {
    const noOfEntriesDeleted = await database.entry.destroy(
      { where: { transactionId } }
    );
    if (noOfEntriesDeleted === 0) { return null; }
    return transactionId;
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
