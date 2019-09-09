import {
  createValidation,
  vd
} from "modusbox-ui-components/dist/redux-validation";

export const getSettingsValidators = () => ({
  name: createValidation([vd.isRequired]),
  protocol: createValidation([vd.isRequired]),
  host: createValidation([vd.isRequired]),
  port: createValidation([vd.isRequired, vd.isNum])
});
