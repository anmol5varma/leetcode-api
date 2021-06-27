import Joi from 'joi';
import { passwordRegex } from '../../constants/regex';

export const userBodySchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().regex(passwordRegex).required()
});

