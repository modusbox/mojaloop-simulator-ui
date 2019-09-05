import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, ControlIcon, DataList, Spinner, Title } from 'components';
import './Users.css';
import {
  initUsers,
  openNewUserModal,
  openEditUserModal,
  deleteUser,
} from './actions';
import {
  getIsUsersLoading,
  getUsers,
  getIsUserModalVisible,
} from './selectors';

import UserModal from './UserModal';

const stateProps = state => ({
  isUsersLoading: getIsUsersLoading(state),
  users: getUsers(state),
  isUserModalVisible: getIsUserModalVisible(state),
});
const actionProps = dispatch => ({
  onMount: () => dispatch(initUsers()),
  onAddUserClick: () => dispatch(openNewUserModal()),
  onEditUserClick: (user) => dispatch(openEditUserModal(user)),
  onDeleteUserClick: (user) => dispatch(deleteUser(user)),
});

const UsersLoader = () => <Spinner center size="m" />;
const UsersError = () => <div id="app_error">There was an error while reading the environments</div>;


class Users extends PureComponent {
  render() {
    const {
      users,
      isUserModalVisible,
      onAddUserClick,
      onEditUserClick,
      onDeleteUserClick,
    } = this.props;

    const columns = [
      {
        label: 'Display Name',
        key: 'displayName',
      },
      {
        label: 'First Name',
        key: 'firstName',
      },
      {
        label: 'Middle Name',
        key: 'middleName',
      },
      {
        label: 'Last Name',
        key: 'lastName',
      },
      {
        label: 'Date Of Birth',
        key: 'dateOfBirth',
      },
      {
        label: 'Id Type',
        key: 'idType',
      },
      {
        label: 'Id Value',
        key: 'idValue',
      },
      {
        label: '',
        key: '',
        className: 'icon__column-40',
        func: (_, item) => (
          <ControlIcon
            icon="edit-small"
            size={20}
            className="users__icon__edit"
            onClick={() => onEditUserClick(item)}
          />
        )
      },
      {
        label: '',
        key: '',
        className: 'icon__column-40',
        func: (_, item) => (
          <ControlIcon
            icon="close-small"
            size={20}
            className="users__icon__delete"
            onClick={() => onDeleteUserClick(item)}
          />
        )
      },
    ];
    return (
      <div id="users">

        <div className="users__button__row">
          <Button label="Add User" onClick={onAddUserClick} icon="plus-small" />
        </div>
        <Title>Users</Title>

        <DataList
          list={users}
          columns={columns}
          sortColumn="First Name"
          flex
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
