import config from 'dotenv';
import database from '../models';
import estimateMarketValue from '../utils/marketEstimation';
import { entryTypes } from '../utils/section.util';

config.config();

class SectionService {
  static async getAllSections() {
    const sections = await database.section.findAll({ include: ['entries'] });
    return sections.map((section) => section.get())
      .map(({ id, entries, ...section }) => {
        const differentTypes = entryTypes(entries);
        return {
          ...section,
          types: Object.values(differentTypes)
        };
      });
  }

  static async getSectionList() {
    const sections = await database.section.findAll({ include: ['entries'] });
    return sections.map((section) => section.get()).map(({ name, shortHand, entries }) => {
      const type = entryTypes(entries);
      return {
        name,
        shortHand,
        types: Object.keys(type)
      };
    });
  }

  static async getSectionDetails({ shortHand }) {
    const section = await database.section.findByPk(shortHand, { include: ['entries'] });
    if (section === null) { return null; }
    let entries = section.get().entries?.map((entry) => entry.get());

    const differentTypes = entryTypes(entries);

    const totalInvestment = entries.reduce((sum, entry) => sum + entry.totalCost, 0);

    const types = Object.values(differentTypes);
    types.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));

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

  static async getMarketData({ shortHand }) {
    if (shortHand) {
      const section = await database.section.findByPk(shortHand, { include: ['entries'] });
      if (section === null) { return null; }
      const entries = section.get().entries?.map((entry) => entry.get());
      const differentTypes = entryTypes(entries);
      return estimateMarketValue(shortHand, Object.values(differentTypes));
    }
    const sections = await database.section.findAll({ include: ['entries'] });
    const sectionWiseMarket = await Promise.all(
      sections.map((section) => section.get())
        .map(({ shortHand: sectionHand, entries }) => {
          const differentTypes = entryTypes(entries);
          return estimateMarketValue(sectionHand, Object.values(differentTypes));
        })
    );
    return sectionWiseMarket.reduce((acc, curr) => ({ ...acc, ...curr }), {});
  }

  static async updateSection(section) {
    const updatedSeqObj = await database.section.update(
      section,
      { where: { shortHand: section.shortHand } }
    );
    if (!updatedSeqObj[0]) { return null; }
    return section;
  }
}

export default SectionService;
