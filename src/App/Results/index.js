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
import { DataList, Spinner } from "components";
import "./Results.css";
import { initResults } from "./actions";
import { getIsResultsLoading } from "./selectors";

const columns = [
  {
    label: "Test Ran",
    key: "test",
    className: "results__row__test"
  },
  {
    label: "Amount Sent",
    key: "amount"
  },
  {
    label: "Response",
    key: "response"
  },
  {
    label: "From DFSP",
    key: "from"
  },
  {
    label: "To DFSP",
    key: "to"
  }
];

const generateRecord = (_, i) => ({
  test: `test number #${i}`,
  amount: `${250 + (i % 3) * 50 + (i % 2) * 12}`,
  response: `Test response`,
  from: `DFSP #${i % 3}`,
  to: `DFSP #${i % 4}`
});
const items = new Array(10).fill(0).map(generateRecord);

const ResultsLoader = () => <Spinner center size="m" />;
const ResultsError = () => (
  <div id="app_error">There was an error while reading the results</div>
);

class Results extends PureComponent {
  render() {
    return (
      <div id="results">
        <div id="results__list">
          <DataList list={items} columns={columns} flex />
        </div>
      </div>
    );
  }
}

const stateProps = state => ({
  isResultsLoading: getIsResultsLoading(state)
});
const actionProps = dispatch => ({
  initResults: () => dispatch(initResults())
});

class ResultsWrapper extends PureComponent {
  componentWillMount() {
    this.props.initResults();
  }
  render() {
    if (this.props.isResultsLoading) {
      return <ResultsLoader />;
    } else if (this.props.isResultsLoadingFailed) {
      return <ResultsError />;
    }
    return <Results {...this.props} />;
  }
}

const ConnectedResults = connect(
  stateProps,
  actionProps
)(ResultsWrapper);

export default ConnectedResults;

export { Results };
