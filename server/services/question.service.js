import questionsData from '../data/questions.json';
import { getFilteredData } from '../utils/common.util';

class QuestionService {
  static getAllQuestions() {
    return questionsData;
  }

  static getFilteredQuestions({
    companies,
    difficulty,
    page,
    limit
  }) {
    if (!page || !limit) { throw new Error('Please specify page and limit query params'); }
    const filteredQuestions = getFilteredData({ difficulty, companies }, questionsData);

    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(page * limit, filteredQuestions.length - 1);

    const results = {};
    if (endIndex < filteredQuestions.length) {
      results.metadata = {
        page,
        limit,
        totalPage: Math.ceil(filteredQuestions.length / limit)
      };
    }

    results.data = filteredQuestions.slice(startIndex, endIndex);

    return results;
  }
}

export default QuestionService;
