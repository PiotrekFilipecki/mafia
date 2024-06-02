import airDB from './airtableClient';
import Joi from 'joi';

const schema = Joi.object({
  firstName: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.string().required(),
  message: Joi.string().required(),
  phone: Joi.string().required(),
  code: Joi.string().max(8).required(),
});

const create = async (payload) => {
  const validatedOffer = await schema.validateAsync(payload);
  const submission = await airDB('submissions').create([
    {
      fields: {
        ...validatedOffer,
      }
    }
  ]);

  return submission;
};

export default create;
