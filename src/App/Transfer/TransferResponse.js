import React, { PureComponent } from 'react';
import { MessageBox, Title, Tooltip } from 'components';
import get from 'lodash/get';
import './Transfer.css';

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
    const { response, name } = this.props;
    const operation = get(response, `${name}`);
    const data = get(operation, `result`);

    if (operation.error) {
      return <MessageBox icon="warning-sign" size={20} kind="error" message={operation.error} />
    }

    if (!data) {
      return null;
    }

    if (data && data.message) {
      return <MessageBox icon="warning-sign" size={20} kind="error" message={data.message} />
    }

    return (
      <div id="transfe__response">

        <Title>Response</Title>
        
        <ResponseRow title="General">
          <ResponseItem label="Home Transaction ID" path='homeTransactionId' data={data}/>
          <ResponseItem label="Note" path='note' data={data}/>
        </ResponseRow>

        <ResponseRow title="From">
          <ResponseItem label="Display Name" path='from.displayName' data={data} />
          <ResponseItem label="ID Type" path='from.idType' data={data} small />
          <ResponseItem label="ID Valud" path='from.idValue' data={data} small />
        </ResponseRow>

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

        <ResponseRow title="Amount">
          <ResponseItem label="Amount Type" path='amountType' data={data} small />
          <ResponseItem label="Currency" path='currency' data={data} small />
          <ResponseItem label="Amount" path='amount' data={data} small />
          <ResponseItem label="Transaction Type" path='transactionType' data={data} small />
        </ResponseRow>

        <ResponseRow title="Transfer">
          <ResponseItem label="Current State" path='currentState' data={data}/>
          <ResponseItem label="Transfer ID" path='transferId' data={data}/>
        </ResponseRow>

        <ResponseRow title="Quote">
          <ResponseItem label="Quote ID" path='quoteId' data={data}/>
          <ResponseItem label="Expiration" path='quoteResponse.expiration' data={data}/>
        </ResponseRow>
        
        <ResponseRow>
          <ResponseItem label="Quote Amount" path='quoteResponse.transferAmount.amount' data={data}/>
          <ResponseItem label="Quote Currency" path='quoteResponse.transferAmount.currency' data={data}/>
        </ResponseRow>

        <ResponseRow>
          <ResponseItem label="ilp Packet" path='quoteResponse.ilpPacket' data={data} small split/>
          <ResponseItem label="Condition" path='quoteResponse.condition' data={data} small/>
        </ResponseRow>

        <ResponseRow>
          <ResponseItem label="Payee FSP Fee Amount" path='quoteResponse.payeeFspFee.amount' data={data} />
          <ResponseItem label="Payee FSP Fee Currency" path='quoteResponse.payeeFspFee.currency' data={data} />
        </ResponseRow>

        <ResponseRow>
          <ResponseItem label="Payee FSP Commission" path='quoteResponse.payeeFspCommission.amount' data={data} />
          <ResponseItem label="Payee FSP Commission" path='quoteResponse.payeeFspCommission.currency' data={data} />
        </ResponseRow>

      </div>
    );
  }
}

export default TransferResponse;