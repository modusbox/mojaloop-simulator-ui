/******************************************************************************
 *  Copyright 2019 ModusBox, Inc.                                             *
 *                                                                            *
 *  info@modusbox.com                                                         *
 *                                                                            *
 *  Licensed under the Apache License, Version 2.0 (the "License");           *
 *  you may not use this file except in compliance with the License.          *
 *  You may obtain a copy of the License at                                   *
 *  http://www.apache.org/licenses/LICENSE-2.0                                *
 *                                                                            *
 *  Unless required by applicable law or agreed to in writing, software       *
 *  distributed under the License is distributed on an "AS IS" BASIS,         *
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 *  See the License for the specific language governing permissions and       *
 *  limitations under the License.                                            *
 ******************************************************************************/

import React from "react";
import { connect } from "react-redux";
import { FormInput, Modal } from "components";
import { ID_TYPES } from "../constants";
import {
  changeUserDisplayName,
  changeUserFirstName,
  changeUserLastName,
  changeUserMiddleName,
  changeUserDateOfBirth,
  changeUserIdType,
  changeUserIdValue,
  hideUserModal,
  submitUserModal
} from "../actions";
import {
  getUser,
  getUserId,
  getUserValidationResult,
  getIsSubmitEnabled
} from "../selectors";
import "./index.css";

const stateProps = state => ({
  user: getUser(state),
  userId: getUserId(state),
  validation: getUserValidationResult(state),
  isSubmitEnabled: getIsSubmitEnabled(state)
});
const actionProps = dispatch => ({
  onChangeUserDisplayName: value => dispatch(changeUserDisplayName(value)),
  onChangeUserFirstName: value => dispatch(changeUserFirstName(value)),
  onChangeUserLastName: value => dispatch(changeUserLastName(value)),
  onChangeUserMiddleName: value => dispatch(changeUserMiddleName(value)),
  onChangeUserDateOfBirth: value => dispatch(changeUserDateOfBirth(value)),
  onChangeUserIdType: value => dispatch(changeUserIdType(value)),
  onChangeUserIdValue: value => dispatch(changeUserIdValue(value)),
  onCloseClick: () => dispatch(hideUserModal()),
  onSubmitClick: () => dispatch(submitUserModal())
});

const UserModal = ({
  user,
  userId,
  validation,
  isSubmitEnabled,
  onChangeUserField,
  onChangeUserDisplayName,
  onChangeUserFirstName,
  onChangeUserLastName,
  onChangeUserMiddleName,
  onChangeUserDateOfBirth,
  onChangeUserIdType,
  onChangeUserIdValue,
  onCloseClick,
  onSubmitClick
}) => {
  return (
    <Modal
      onClose={onCloseClick}
      onSubmit={onSubmitClick}
      allowSubmit
      isSubmitEnabled={isSubmitEnabled}
      id="user-modal"
      title="User"
    >
      <div className="user-modal__content">
        <FormInput
          type="text"
          size="m"
          value={user.displayName}
          validation={validation.fields.displayName}
          onChange={onChangeUserDisplayName}
          label="Display Name"
          className="user-modal__form__form-input"
        />
        <FormInput
          type="text"
          size="m"
          value={user.firstName}
          validation={validation.fields.firstName}
          onChange={onChangeUserFirstName}
          label="First Name"
          className="user-modal__form__form-input"
        />
        <FormInput
          type="text"
          size="m"
          value={user.lastName}
          validation={validation.fields.lastName}
          onChange={onChangeUserLastName}
          label="Last Name"
          className="user-modal__form__form-input"
        />
        <FormInput
          type="text"
          size="m"
          value={user.middleName}
          validation={validation.fields.middleName}
          onChange={onChangeUserMiddleName}
          label="Middle Name"
          className="user-modal__form__form-input"
        />
        <FormInput
          type="text"
          size="m"
          value={user.dateOfBirth}
          validation={validation.fields.dateOfBirth}
          onChange={onChangeUserDateOfBirth}
          label="DateOfBirth"
          className="user-modal__form__form-input"
        />
        <FormInput
          type="select"
          size="m"
          options={ID_TYPES}
          value={user.idType}
          validation={validation.fields.idType}
          disabled={userId !== undefined}
          onChange={onChangeUserIdType}
          label="Id Type"
          className="user-modal__form__form-input"
        />
        <FormInput
          type="text"
          size="m"
          value={user.idValue}
          validation={validation.fields.idValue}
          disabled={userId !== undefined}
          onChange={onChangeUserIdValue}
          label="Id Value"
          className="user-modal__form__form-input"
        />
      </div>
    </Modal>
  );
};

const ConnectedUserModal = connect(
  stateProps,
  actionProps
)(UserModal);

export default ConnectedUserModal;
