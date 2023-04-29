export const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, ms);
  });
};

export const getFilteredData = ({ difficulty, companies }, data) => {
  return data.reduce((acc, question) => {
    const difficultyList = difficulty?.toLowerCase()?.split(',') ?? [];
    const companyList = companies?.toLowerCase()?.split(',') ?? [];

    if (!difficultyList.includes(question.difficulty.toLowerCase())) { return acc; }

    const containsCompany = question
      .companies.filter((company) => companyList.includes(company.company_name.toLowerCase()));

    if (containsCompany.length === 0) { return acc; }
    return acc.concat({
      ...question,
      companies: containsCompany
    });
  }, []);
};
