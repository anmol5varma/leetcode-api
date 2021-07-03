import SectionService from '../services/section.service';

class SectionController {
  static async getAllSections(req, res) {
    const sections = await SectionService.getAllSections();
    return res.status(200).json(sections);
  }

  static async getSectionList(req, res) {
    const sections = await SectionService.getSectionList();
    return res.status(200).json(sections);
  }

  static async getSectionDetails(req, res) {
    const { shortHand } = req.params;
    const section = await SectionService.getSectionDetails({ shortHand });
    return res.status(200).json(section);
  }

  static async addSection(req, res) {
    const newSection = req.body;
    const createdSection = await SectionService.addSection(newSection);
    return res.status(201).json(createdSection);
  }

  static async updateSection(req, res) {
    const section = req.body;
    const updatedSection = await SectionService.updateSection(section);
    if (!updatedSection) {
      return res.status(400).json('Bad request');
    }
    return res.status(200).json(updatedSection);
  }

  // static async deleteUser(req, res) {
  //   const data = req.body;
  //   try {
  //     const userToDelete = await SectionService.deleteUser(data);
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

export default SectionController;
