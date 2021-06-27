import expressJoi from 'express-joi-validation';

const validator = expressJoi.createValidator({ passError: true });

export default validator;
