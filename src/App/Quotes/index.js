import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, FormInput, ScrollBox, Spinner, Title } from 'components';
import { QUOTE_RESPONSES, QUOTE_REJECT_REASONS } from './constants';
import {
  getIsQuotesLoading,
  getQuotes,
  getQuoteResponses,
} from './selectors';
import {
  initQuotes,
  changeQuoteResponse
} from './actions';
import './Quotes.css';

const stateProps = state => ({
  isQuotesLoading: getIsQuotesLoading(state),
  quotes: getQuotes(state),
  quoteResponses: getQuoteResponses(state),
});
const actionProps = dispatch => ({
  initQuotes: () => dispatch(initQuotes()),
  onQuoteResponseChange: (value, index) => dispatch(changeQuoteResponse(value, index)),
});



const QuotesLoader = () => <Spinner center size="m" />;
const QuotesError = () => <div id="app_error">There was an error while reading the quotes</div>;

const Quotes = ({
  quotes,
  quoteResponses,
  onQuoteResponseChange
}) => {
  
  return (
    <div id="quotes">
      <ScrollBox>
        <div className="quotes__list">
          {quotes.map((quote, index) => <Quote
            quote={quote}
            quoteResponse={quoteResponses[index]}
            onQuoteResponseChange={value => onQuoteResponseChange(value, index)}
          />)}
        </div>
      </ScrollBox>
    </div>
  );
}

const Quote = ({ quote, quoteResponse, onQuoteResponseChange }) => (
  <div className="quote">
    <div className="quote__row">
      <QuoteBlock label="Date" value={quote.date} />
      <QuoteBlock label="Type" value={quote.type} />
      <QuoteBlock label="Transfer Amount" value={quote.amount} />
      <QuoteBlock label="Payee DFSP" value={quote.dfspId} />
    </div>
    <div className="quote__row">
      <div className="quote__response__form">
        <div className="quote__response__form-input">
          <FormInput
            size="m"
            type="select"
            options={QUOTE_RESPONSES}
            value={quoteResponse}
            onChange={onQuoteResponseChange}
          />
        </div>
        <div className="quote__response__form-input">
          <FormInput
            size="m"
            type="select"
            options={QUOTE_RESPONSES}
            value={'s'}
            onChange={console.log}
          />
        </div>
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
