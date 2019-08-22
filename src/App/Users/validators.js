import { createValidator, createValidation, vd } from 'modusbox-ui-components/dist/redux-validation';

const idTypeAndValidValidator = (value, isUnique) => 
  createValidator(`Id Type and Id Value must be unique`, () => (value !== undefined ? isUnique : false));

export const getUserValidators = (idType, idValue, isIdTypeAndValidUnique) => {
  const validators = {
    displayName: createValidation([vd.isRequired]),
    firstName: createValidation([vd.isRequired]),
    lastName: createValidation([vd.isRequired]),
    middleName: createValidation([vd.isRequired]),
    dateOfBirth: createValidation([vd.isRequired]),
    idType: createValidation([vd.isRequired, idTypeAndValidValidator(idType, isIdTypeAndValidUnique)]),
    idValue: createValidation([vd.isRequired, idTypeAndValidValidator(idValue, isIdTypeAndValidUnique)]),
  };
  return validators;
}