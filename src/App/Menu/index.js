import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Menu, MenuItem } from "components";
//import { getMenuIcons } from './selectors';

const stateProps = state => ({
  //  icons: getMenuIcons(state),
});

const MenuStructure = ({ pathname, onChange }) => {
  return (
    <Menu path="/" pathname={pathname} onChange={onChange}>
      <MenuItem path="/users" label="Config Inbound" />
      <MenuItem path="/transfer" label="Outbound Send" />
      <MenuItem path="/settings" label="Settings" />
    </Menu>
  );
};

const RouterMenu = ({ location, history }) => (
  <MenuStructure pathname={location.pathname} onChange={history.push} />
);
const ConnectedRouter = connect(
  stateProps,
  null
)(RouterMenu);
export default withRouter(ConnectedRouter);
