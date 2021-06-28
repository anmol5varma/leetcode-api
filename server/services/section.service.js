import config from 'dotenv';
import database from '../models';

config.config();

class SectionService {
  static async getAllSections() {
    const sections = await database.section.findAll({ include: ['entries'] });
    return sections.map(section => section.get()).map(({ id, entries, ...section }) => ({
      ...section,
      totalInvestment: entries.reduce((sum, entry) => sum + entry.totalCost, 0)
    }));
  }

  static async getSectionList() {
    const sections = await database.section.findAll();
    return sections.map(section => section.get()).map(({ name, shortHand }) => ({
      name,
      shortHand
    }));
  }

  static async getSectionDetails({ shortHand }) {
    const section = await database.section.findByPk(shortHand, { include: ['entries'] });
    if (section === null)
      return null
    const entries = section?.get().entries?.map((entry) => entry.get());

    const differentTypes = entries?.reduce((groupCount, entry) => {
      const newGroupCount = { ...groupCount }
      if (newGroupCount[entry.name]) {
        newGroupCount[entry.name] += entry.quantity
      } else {
        newGroupCount[entry.name] = entry.quantity
      }
      return newGroupCount
    }, {})

    const totalInvestment = entries.reduce((sum, entry) => sum + entry.totalCost, 0)

    return {
      name: section.name,
      shortHand: section.shortHand,
      description: section.username,
      createdAt: section.createdAt,
      updatedAt: section.updatedAt,
      totalInvestment,
      types: differentTypes,
      entries: entries,
    }
  }

  static async addSection(section) {
    const newSeqSection = await database.section.create(section);
    const { id, ...newSection } = newSeqSection.get();
    return newSection;
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

export default SectionService;
