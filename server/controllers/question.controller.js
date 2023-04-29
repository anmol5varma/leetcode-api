import QuestionService from '../services/question.service';

class QuestionController {
  static async getAllQuestions(req, res) {
    try {
      const questions = QuestionService.getAllQuestions();
      return res.status(200).json(questions);
    } catch (error) {
      console.error(`${req.id} - ${error}`);
      return res.status(500).json('Unexpected error');
    }
  }

  static async getQuestions(req, res) {
    try {
      const {
        companies, difficulty, page, limit
      } = req.query;
      const questions = QuestionService.getFilteredQuestions({
        companies, difficulty, page: +page, limit: +limit
      });
      return res.status(200).json(questions);
    } catch (error) {
      console.error(`${req.id} - ${error}`);
      return res.status(500).json('Unexpected error');
    }
  }
}

export default QuestionController;
