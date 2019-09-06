import {
  createValidation,
  vd
} from "modusbox-ui-components/dist/redux-validation";

export const getQuoteRequestValidators = () => {
  const validators = {
    type: createValidation([vd.isRequired]),
    amount: createValidation([vd.isRequired, vd.isNum]),
    currency: createValidation([vd.isRequired]),
    payeeDfspId: createValidation([vd.isRequired])
  };
  return validators;
};
