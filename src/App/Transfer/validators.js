import { createValidator, createValidation, vd } from 'modusbox-ui-components/dist/redux-validation';

const isUuid = createValidator(
  `Is a valid UUID`,
  v => /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/.test(v)
);

const isIdType = createValidator(
  `Is a valid idType`,
  (v) => v ? ['MSISDN', 'ACCOUNT_NO'].includes(v) : false
);

export const getTransferRequestValidators = () => {
  const validators = {
    name: createValidation([vd.isRequired, vd.isAlphaNum]),
    operation: createValidation([vd.isRequired]),
    body: {
      homeTransactionId: createValidation([vd.isRequired, isUuid]),
      from: {
        idType: createValidation([vd.isRequired, isIdType]),
        idValue: createValidation([vd.isRequired, vd.isNum, vd.isLongBetween(1,128)])
      },
      to: {
        idType: createValidation([vd.isRequired, isIdType]),
        idValue: createValidation([vd.isRequired, vd.isNum, vd.isLongBetween(1,128)])
      },
      amount: createValidation([vd.isRequired, vd.isNum]),
      currency: createValidation([vd.isRequired, vd.maxLength(3)]),
    }
  };
  return validators;
};