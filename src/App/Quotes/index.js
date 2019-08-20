import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, FormInput, ScrollBox, Spinner, Title } from 'components';
import {
  QUOTE_RESPONSE_ACCEPT,
  QUOTE_RESPONSE_REJECT,
  QUOTE_RESPONSES,
  QUOTE_REJECT_REASONS
} from './constants';
import {
  getIsQuotesLoading,
  getQuotes,
  getQuoteResponses,
} from './selectors';
import {
  initQuotes,
  changeQuoteResponseType,
  changeQuoteResponseAmount,
} from './actions';
import './Quotes.css';

const stateProps = state => ({
  isQuotesLoading: getIsQuotesLoading(state),
  quotes: getQuotes(state),
  quoteResponses: getQuoteResponses(state),
});
const actionProps = dispatch => ({
  initQuotes: () => dispatch(initQuotes()),
  onQuoteResponseTypeChange: (type, index) => dispatch(changeQuoteResponseType({ type, index })),
  onQuoteResponseAmountChange: (amount, index) => dispatch(changeQuoteResponseAmount({ amount, index })),
  onQuoteResponseCurrencyChange: (currency, index) => dispatch(changeQuoteResponseType({ currency, index })),
  onQuoteResponseReasonChange: (reason, index) => dispatch(changeQuoteResponseAmount({ reason, index })),
});



const QuotesLoader = () => <Spinner center size="m" />;
const QuotesError = () => <div id="app_error">There was an error while reading the quotes</div>;

const Quotes = ({
  quotes,
  quoteResponses,
  onQuoteResponseTypeChange,
  onQuoteResponseAmountChange,
  onQuoteResponseCurrencyChange,
  onQuoteResponseReasonChange,
}) => {
  
  return (
    <div id="quotes">
      <ScrollBox>
        <div className="quotes__list">
          {quotes.map((quote, index) => <Quote
            key={index}
            quote={quote}
            response={quoteResponses[index]}
            onQuoteResponseTypeChange={value => onQuoteResponseTypeChange(value, index)}
            onQuoteResponseAmountChange={value => onQuoteResponseAmountChange(value, index)}
            onQuoteResponseCurrencyChange={value => onQuoteResponseCurrencyChange(value, index)}
            onQuoteResponseReasonChange={value => onQuoteResponseReasonChange(value, index)}
          />)}
        </div>
      </ScrollBox>
    </div>
  );
}

const Quote = ({
  quote,
  response,
  quoteAmount,
  onQuoteResponseTypeChange,
  onQuoteResponseAmountChange,
  onQuoteResponseCurrencyChange,
  onQuoteResponseReasonChange,
}) => (
  <div className="quote">
    <div className="quote__row">
      <QuoteBlock label="Date" value={quote.date} />
      <QuoteBlock label="Type" value={quote.type} />
      <QuoteBlock label="Transfer Amount" value={quote.amount} />
      <QuoteBlock label="Payee DFSP" value={quote.dfspId} />
    </div>
    <div className="quote__row">
      <div className="quote__response__form">
        <div className="quote__response__form-input quote__response__type">
          <FormInput
            size="m"
            type="select"
            options={QUOTE_RESPONSES}
            value={response.type}
            onChange={onQuoteResponseTypeChange}
          />
        </div>
        {response.type === QUOTE_RESPONSE_ACCEPT && [
          <div className="quote__response__form-input quote__response__amount" key="amount">
            <FormInput
              size="m"
              type="text"
              value={response.amount}
              onChange={onQuoteResponseAmountChange}
            />
          </div>,
          <div className="quote__response__form-input quote__response__currency" key="currency">
            <FormInput
              size="m"
              type="text"
              value={response.currency}
              onChange={onQuoteResponseCurrencyChange}
            />
          </div>
        ]}
        {response.type === QUOTE_RESPONSE_REJECT && 
          <div className="quote__response__form-input quote__response__reason">
            <FormInput
              size="m"
              type="select"
              placeholder="Reason"
              options={QUOTE_REJECT_REASONS}
              value={response.reason}
              onChange={onQuoteResponseReasonChange}
            />
          </div>
        }
        <div className="quote__response__form-input">
          <Button
            size="m"
            label="Send Response"
            pending={true}
            disabled
          />
        </div>
      </div>

    </div>
  </div>
);

const QuoteBlock = ({ label, value }) => (
  <div className="quote__data__block">
    <div className="quote__data__label">{label}</div>
    <div className="quote__data__value">{value}</div>
  </div>
);


class QuotesWrapper extends PureComponent {
  componentWillMount() {
    this.props.initQuotes();
  }
  render() {
    if (this.props.isQuotesLoading) {
      return <QuotesLoader />;
    } else if (this.props.isQuotesLoadingFailed) {
      return <QuotesError />;
    }
    return <Quotes {...this.props} />;
  }
}

const ConnectedQuotes = connect(
  stateProps,
  actionProps
)(QuotesWrapper);

export default ConnectedQuotes;

export { Quotes };
