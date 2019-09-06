const QUOTE_RESPONSE_ACCEPT = "ACCEPT";
const QUOTE_RESPONSE_REJECT = "REJECT";
const QUOTE_RESPONSES = [
  {
    label: "Accept",
    value: QUOTE_RESPONSE_ACCEPT
  },
  {
    label: "Reject",
    value: QUOTE_RESPONSE_REJECT
  }
];

const QUOTE_REJECT_REASONS = [
  {
    label: "Reason 1",
    value: "REASON_1"
  },
  {
    label: "Reason 2",
    value: "REASON_2"
  }
];

export {
  QUOTE_RESPONSE_ACCEPT,
  QUOTE_RESPONSE_REJECT,
  QUOTE_RESPONSES,
  QUOTE_REJECT_REASONS
};
