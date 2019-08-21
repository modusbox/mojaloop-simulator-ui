import { createValidation, vd } from 'modusbox-ui-components/dist/redux-validation';

const acceptValidators = {
  amount: createValidation([vd.isRequired, vd.isNum]),
  currency: createValidation([vd.isRequired]),
}

const rejectValidators = {
  reason: createValidation([vd.isRequired])
};

export const getQuoteResponseValidators = (isAccepted) => {
  const validators = {
    type: createValidation([vd.isRequired]),
  }
  if (isAccepted) {
    return {
      ...validators,
      ...acceptValidators,
    }
  } else {
    return {
      ...validators,
      ...rejectValidators,
    }
  }
}