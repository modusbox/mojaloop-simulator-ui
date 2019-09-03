import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Spinner, Tab, Tabs, TabPanel, TabPanels, TabList, Title } from 'components';
import SimpleTransferForm from './SimpleTransferForm';
import AdvancedTransferForm from './AdvancedTransferForm';
import TransferResponse from './TransferResponse';
import './Transfer.css';

import {
  changeName,
  changeOperation,
  changeHomeTransactionId,
  changeFromDisplayName,
  changeFromIdType,
  changeFromIdValue,
  changeToIdType,
  changeToIdValue,
  changeNote,
  changeAmountType,
  changeAmount,
  changeCurrency,
  changeTransactionType,
  randomize,
  sendTransfer,
} from './actions';
import {
  getIsTransferLoading,
  getTransfer,
  getTransferResponse,
  getIsSubmitEnabled,
  getIsSubmitPending,
  getValidationResult,
} from './selectors';

const stateProps = state => ({
  isTransferLoading: getIsTransferLoading(state),
  transfer: getTransfer(state),
  transferResponse: getTransferResponse(state),
  isSubmitEnabled: getIsSubmitEnabled(state),
  isSubmitPending: getIsSubmitPending(state),
  validation: getValidationResult(state),
});
const actionProps = dispatch => ({
  onNameChange: value => dispatch(changeName(value)),
  onOperationChange: value => dispatch(changeOperation(value)),
  onHomeTransactionIdChange: value => dispatch(changeHomeTransactionId(value)),
  onFromDisplayNameChange: value => dispatch(changeFromDisplayName(value)),
  onFromIdTypeChange: value => dispatch(changeFromIdType(value)),
  onFromIdValueChange: value => dispatch(changeFromIdValue(value)),
  onToIdTypeChange: value => dispatch(changeToIdType(value)),
  onToIdValueChange: value => dispatch(changeToIdValue(value)),
  onNoteChange: value => dispatch(changeNote(value)),
  onAmountTypeChange: value => dispatch(changeAmountType(value)),
  onAmountChange: value => dispatch(changeAmount(value)),
  onCurrencyChange: value => dispatch(changeCurrency(value)),
  onTransactionTypeChange: value => dispatch(changeTransactionType(value)),
  onSendTransferClick: () => dispatch(sendTransfer()),
  onRandomizeClick: () =>dispatch(randomize()),
});

const TransferLoader = () => <Spinner center size="m" />;
const TransferError = () => <div id="app_error">There was an error while reading the environments</div>;

class Transfer extends PureComponent {
  render() {
    const {
      transfer,
      transferResponse,
      validation,
      isSubmitEnabled,
      isSubmitPending,

      onNameChange,
      onOperationChange,
      onHomeTransactionIdChange,
      onFromDisplayNameChange,
      onFromIdTypeChange,
      onFromIdValueChange,
      onToIdTypeChange,
      onToIdValueChange,
      onNoteChange,
      onAmountTypeChange,
      onAmountChange,
      onCurrencyChange,
      onTransactionTypeChange,
      
      onRandomizeClick,
      onSendTransferClick,
    } = this.props;
    return (
      <div id="transfer">

        <div className="transfer__section"> 
          <Title>Send</Title>
            <Tabs>
              <TabList>
                <Tab>Simple Mode</Tab>
                <Tab>Advanced Mode</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <SimpleTransferForm
                    transfer={transfer}
                    validation={validation}
                    onNameChange={onNameChange}
                    onOperationChange={onOperationChange}
                    onHomeTransactionIdChange={onHomeTransactionIdChange}
                    onFromDisplayNameChange={onFromDisplayNameChange}
                    onFromIdTypeChange={onFromIdTypeChange}
                    onFromIdValueChange={onFromIdValueChange}
                    onToIdTypeChange={onToIdTypeChange}
                    onToIdValueChange={onToIdValueChange}
                    onNoteChange={onNoteChange}
                    onAmountTypeChange={onAmountTypeChange}
                    onAmountChange={onAmountChange}
                    onCurrencyChange={onCurrencyChange}
                    onTransactionTypeChange={onTransactionTypeChange}
                  />
                </TabPanel>
                <TabPanel>
                  <AdvancedTransferForm
                    transfer={transfer}
                    validation={validation}
                    onNameChange={onNameChange}
                    onOperationChange={onOperationChange}
                    onHomeTransactionIdChange={onHomeTransactionIdChange}
                    onFromDisplayNameChange={onFromDisplayNameChange}
                    onFromIdTypeChange={onFromIdTypeChange}
                    onFromIdValueChange={onFromIdValueChange}
                    onToIdTypeChange={onToIdTypeChange}
                    onToIdValueChange={onToIdValueChange}
                    onNoteChange={onNoteChange}
                    onAmountTypeChange={onAmountTypeChange}
                    onAmountChange={onAmountChange}
                    onCurrencyChange={onCurrencyChange}
                    onTransactionTypeChange={onTransactionTypeChange}
                  />
                  
                </TabPanel>
              </TabPanels>
            </Tabs>
          
          <div className="transfer__button__row">
            <Button 
              className="transfer__button__item"
              kind="secondary"
              noFill
              label="Randomize"
              onClick={onRandomizeClick}
            />
            <Button 
              className="transfer__button__item"
              icon="open"
              label="Send Transfer"
              iconPosition="right"
              disabled={!isSubmitEnabled}
              pending={isSubmitPending}
              onClick={onSendTransferClick}
            />
          </div>
        </div>

        {transferResponse && <TransferResponse response={transferResponse} name={transfer.name}/> }

      </div>
    );
  }
}

class TransferWrapper extends PureComponent {
  render() {
    if (this.props.isTransferLoading) {
      return <TransferLoader />;
    } else if (this.props.isTransferLoadingFailed) {
      return <TransferError />;
    }
    return <Transfer {...this.props} />;
  }
}

const ConnectedTransfer = connect(
  stateProps,
  actionProps
)(TransferWrapper);

export default ConnectedTransfer;

export { Transfer };
