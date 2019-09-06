import {
  createValidation,
  vd
} from "modusbox-ui-components/dist/redux-validation";

export const getSettingsValidators = () => ({
  protocol: createValidation([vd.isRequired]),
  host: createValidation([vd.isRequired]),
  port: createValidation([vd.isRequired, vd.isNum])
});
