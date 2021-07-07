import config from 'dotenv';
import database from '../models';

config.config();

class SectionService {
  static async getAllSections() {
    const sections = await database.section.findAll({ include: ['entries'] });
    return sections.map((section) => section.get()).map(({ id, entries, ...section }) => ({
      ...section,
      totalInvestment: entries.reduce((sum, entry) => sum + entry.totalCost, 0)
    }));
  }

  static async getSectionList() {
    const sections = await database.section.findAll();
    return sections.map((section) => section.get()).map(({ name, shortHand }) => ({
      name,
      shortHand
    }));
  }

  static async getSectionDetails({ shortHand }) {
    const section = await database.section.findByPk(shortHand, { include: ['entries'] });
    if (section === null) { return null; }
    const entries = section?.get().entries?.map((entry) => entry.get());

    const differentTypes = entries?.reduce((groupCount, entry) => {
      const newGroupCount = { ...groupCount };
      if (newGroupCount[entry.name]) {
        newGroupCount[entry.name].quantity += entry.quantity;
        newGroupCount[entry.name].cost += entry.totalCost;
      } else {
        newGroupCount[entry.name] = {
          name: entry.name,
          code: entry.code,
          quantity: entry.quantity,
          cost: entry.totalCost
        };
      }
      return newGroupCount;
    }, {});

    const totalInvestment = entries.reduce((sum, entry) => sum + entry.totalCost, 0);

    // entries.sort((a, b) => a.updatedAt - b.updatedAt);

    return {
      name: section.name,
      shortHand: section.shortHand,
      description: section.username,
      createdAt: section.createdAt,
      updatedAt: section.updatedAt,
      totalInvestment,
      types: Object.values(differentTypes),
      entries,
    };
  }

  static async addSection(section) {
    const newSeqSection = await database.section.create(section);
    const { id, ...newSection } = newSeqSection.get();
    return newSection;
  }

  static async updateSection(section) {
    const updatedSeqObj = await database.section.update(
      section,
      { where: { shortHand: section.shortHand } }
    );
    if (!updatedSeqObj[0]) { return null; }
    return section;
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

export default SectionService;
