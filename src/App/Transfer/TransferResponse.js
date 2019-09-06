import React, { PureComponent } from 'react';
import { Checkbox, MessageBox, Row, Title, Tooltip } from 'components';
import get from 'lodash/get';
import './Transfer.css';

const ResponseBlock = ({ type = 'regular', children }) => (
  <div className={`transfer__runner__response-block transfer__runner__response-block--${type}`}>
    {children}
  </div>
);

const ResponseRow = ({ title, children }) => (
  <div className="transfer__runner__response-row">
    <div className="transfer__runner__response-row-label">{title}</div>
    {children}
  </div>
);

const ResponseItem = ({ label, path, data, small = false, split }) => {
  let value = get(data, path);
  let tooltip = split && value && value.match(/.{1,50}/g);
  return (
    <div className={`transfer__runner__response-item ${small ? 'transfer__runner__response-item--small' : ''}`}>
      <div className="transfer__runner__response-item-label">{label}</div>
      <div className="transfer__runner__response-item-path">{path}</div>
      <div className="transfer__runner__response-item-value">
        <div className="transfer__runner__response-item-value__content">
          <Tooltip label={tooltip || value} position="right">{value}</Tooltip>
        </div>
      </div>
    </div>
  );
}

class TransferResponse extends PureComponent {
  render() {
    const { response, name, isAllFieldsVisible, onAllFieldsViewChange } = this.props;
    const operation = get(response, `${name}`);

    if (operation.error) {
      return <MessageBox icon="warning-sign" size={20} kind="error" message={operation.error && operation.error.message} />
    }

    const data = get(operation, `result`);

    if (!data) {
      return null;
    }

    if (data && data.message) {
      return <MessageBox icon="warning-sign" size={20} kind="error" message={data.message} />
    }

    return (
      <div className="transfer__runner__section transfer__runner__section--fading"> 
        <div id="transfe__response">

          <Row align="left">
            <Title>Response</Title>
            <Checkbox
              className="transfer__all-fields__toggle"
              label="Show All Fields"
              onChange={onAllFieldsViewChange}
              checked={isAllFieldsVisible}
            />
          </Row>

          <ResponseBlock type="regular">

            <ResponseRow title="From">
              <ResponseItem label="Display Name" path='from.displayName' data={data} />
              <ResponseItem label="ID Type" path='from.idType' data={data} small />
              <ResponseItem label="ID Value" path='from.idValue' data={data} small />
            </ResponseRow>

          </ResponseBlock>

          <ResponseBlock type="regular">

            <ResponseRow title="To">
              <ResponseItem label="FSP ID" path='to.fspId' data={data} />
              <ResponseItem label="ID Type" path='to.idType' data={data} small />
              <ResponseItem label="ID Value" path='to.idValue' data={data} small />
            </ResponseRow>

            <ResponseRow title="">
              <ResponseItem label="First name" path='to.firstName' data={data} small />
              <ResponseItem label="Middle name" path='to.middleName' data={data} small />
              <ResponseItem label="Last name" path='to.lastName' data={data} small />
              <ResponseItem label="Date Of Birth" path='to.dateOfBirth' data={data} small />
            </ResponseRow>

          </ResponseBlock>

          <ResponseBlock type="regular">

            <ResponseRow title="Transfer">
              <ResponseItem label="Current State" path='currentState' data={data}/>
            </ResponseRow>

          </ResponseBlock>

          <ResponseBlock type="regular">
            <ResponseRow title="Amount">
              <ResponseItem label="Amount Type" path='amountType' data={data} small />
              <ResponseItem label="Currency" path='currency' data={data} small />
              <ResponseItem label="Amount" path='amount' data={data} small />
              <ResponseItem label="Transaction Type" path='transactionType' data={data} small />
            </ResponseRow>
          </ResponseBlock>

          <ResponseBlock type="regular">

            <ResponseRow title="Quote">
              <ResponseItem label="Payee FSP Fee Amount" path='quoteResponse.payeeFspFee.amount' data={data} />
              <ResponseItem label="Payee FSP Fee Currency" path='quoteResponse.payeeFspFee.currency' data={data} />
            </ResponseRow>

            <ResponseRow>
              <ResponseItem label="Quote Amount" path='quoteResponse.transferAmount.amount' data={data}/>
              <ResponseItem label="Quote Currency" path='quoteResponse.transferAmount.currency' data={data}/>
            </ResponseRow>

            <ResponseRow>
              <ResponseItem label="Payee FSP Commission" path='quoteResponse.payeeFspCommission.amount' data={data} />
              <ResponseItem label="Payee FSP Commission" path='quoteResponse.payeeFspCommission.currency' data={data} />
            </ResponseRow>

            <ResponseRow>
              <ResponseItem label="Expiration" path='quoteResponse.expiration' data={data}/>
            </ResponseRow>
          </ResponseBlock>

          {isAllFieldsVisible && (
            <ResponseBlock type="advanced">
              <ResponseRow title="Other">
                <ResponseItem label="Home Transaction ID" path='homeTransactionId' data={data}/>
                <ResponseItem label="Note" path='note' data={data}/>
              </ResponseRow>
              <ResponseRow>
                <ResponseItem label="Transfer ID" path='transferId' data={data}/>
                <ResponseItem label="Quote ID" path='quoteId' data={data} />
              </ResponseRow>
              <ResponseRow>
                <ResponseItem label="ilp Packet" path='quoteResponse.ilpPacket' data={data} small split/>
                <ResponseItem label="Condition" path='quoteResponse.condition' data={data} small/>
              </ResponseRow>
            </ResponseBlock>
          )}


        </div>
      </div>
    );
  }
}

export default TransferResponse;