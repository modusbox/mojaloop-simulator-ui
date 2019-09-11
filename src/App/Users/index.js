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

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Button, ControlIcon, DataList, Spinner, Title } from "components";
import "./Users.css";
import {
  initUsers,
  selectUsers,
  exportUsers,
  importUsers,
  openNewUserModal,
  openEditUserModal,
  deleteUser
} from "./actions";
import {
  getIsUsersLoading,
  getUsers,
  getSelectedUsers,
  getIsUserModalVisible
} from "./selectors";

import UserModal from "./UserModal";

const stateProps = state => ({
  isUsersLoading: getIsUsersLoading(state),
  users: getUsers(state),
  selectedUsers: getSelectedUsers(state),
  isUserModalVisible: getIsUserModalVisible(state)
});
const actionProps = dispatch => ({
  onMount: () => dispatch(initUsers()),
  onUsersCheck: (users) => dispatch(selectUsers(users)),
  onExportUsersClick: () => dispatch(exportUsers()),
  onImportUsersClick: () => dispatch(importUsers()),
  onAddUserClick: () => dispatch(openNewUserModal()),
  onEditUserClick: user => dispatch(openEditUserModal(user)),
  onDeleteUserClick: user => dispatch(deleteUser(user))
});

const UsersLoader = () => <Spinner center size="m" />;
const UsersError = () => (
  <div id="app_error">There was an error while reading the environments</div>
);

class Users extends PureComponent {
  render() {
    const {
      users,
      selectedUsers,
      isUserModalVisible,
      onUsersCheck,
      onExportUsersClick,
      onImportUsersClick,
      onAddUserClick,
      onEditUserClick,
      onDeleteUserClick
    } = this.props;

    const columns = [
      {
        label: "Display Name",
        key: "displayName"
      },
      {
        label: "First Name",
        key: "firstName"
      },
      {
        label: "Middle Name",
        key: "middleName"
      },
      {
        label: "Last Name",
        key: "lastName"
      },
      {
        label: "Date Of Birth",
        key: "dateOfBirth"
      },
      {
        label: "Id Type",
        key: "idType"
      },
      {
        label: "Id Value",
        key: "idValue"
      },
      {
        label: "",
        key: "",
        className: "icon__column-40",
        func: (_, item) => (
          <ControlIcon
            icon="edit-small"
            size={20}
            className="users__icon__edit"
            onClick={() => onEditUserClick(item)}
            tooltip="Edit user"
            tooltipPosition="left"
          />
        )
      },
      {
        label: "",
        key: "",
        className: "icon__column-40",
        func: (_, item) => (
          <ControlIcon
            icon="close-small"
            size={20}
            className="users__icon__delete"
            onClick={() => onDeleteUserClick(item)}
            kind="error"
            tooltip="Delete user"
            tooltipPosition="left"
          />
        )
      }
    ];
    return (
      <div id="users">
        <Title>Users</Title>

        <div className="users__button__row">
          <Button
            className="users__button__item"
            label="Add User"
            onClick={onAddUserClick}
            icon="plus-small"
          />
          <Button
            className="users__button__item"
            label="Import Users"
            onClick={onImportUsersClick}
            icon="open"
            iconPosition="right"
            noFill
            kind="secondary"
          />
          <Button
            className="users__button__item"
            label="Export Users"
            onClick={onExportUsersClick}
            icon="saved"
            iconPosition="right"
            noFill
            kind="secondary"
            disabled={selectedUsers.length === 0}
          />
        </div>

        <DataList
          list={users}
          columns={columns}
          sortColumn="First Name"
          onCheck={onUsersCheck}
          checked={selectedUsers}
        />

        {isUserModalVisible && <UserModal />}
      </div>
    );
  }
}

class UsersWrapper extends PureComponent {
  componentWillMount() {
    this.props.onMount();
  }
  render() {
    if (this.props.isUsersLoading) {
      return <UsersLoader />;
    } else if (this.props.isUsersLoadingFailed) {
      return <UsersError />;
    }
    return <Users {...this.props} />;
  }
}

const ConnectedUsers = connect(
  stateProps,
  actionProps
)(UsersWrapper);

export default ConnectedUsers;

export { Users };
