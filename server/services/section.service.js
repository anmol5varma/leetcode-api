import config from 'dotenv';
import database from '../models';
import estimateMarketValue from '../utils/marketEstimation';
import { entryTypes } from '../utils/section.util';

config.config();

class SectionService {
  static async getAllSections() {
    const sections = await database.section.findAll({ include: ['entries'] });
    return Promise.all(
      sections.map((section) => section.get()).map(async ({ id, entries, ...section }) => {
        const differentTypes = entryTypes(entries);
        const typeDetails = await estimateMarketValue(
          section.shortHand, Object.values(differentTypes)
        );
        const data = typeDetails.reduce((acc, curr) => {
          const newAcc = { ...acc };
          newAcc.totalInvestment += curr.cost;
          newAcc.marketValue += curr.value;
          return newAcc;
        }, {
          totalInvestment: 0,
          marketValue: 0
        });

        return {
          ...section,
          ...data
        };
      })
    );
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
    let entries = section.get().entries?.map((entry) => entry.get());

    const differentTypes = entryTypes(entries);

    const totalInvestment = entries.reduce((sum, entry) => sum + entry.totalCost, 0);

    const types = await estimateMarketValue(shortHand, Object.values(differentTypes));

    entries = entries.sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 10);

    return {
      name: section.name,
      shortHand: section.shortHand,
      description: section.username,
      createdAt: section.createdAt,
      updatedAt: section.updatedAt,
      totalInvestment,
      types,
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
