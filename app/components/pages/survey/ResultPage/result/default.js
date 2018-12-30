import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'antd';
import { withRouter } from 'react-router';
import TaskCompleted from 'images/task-complete.png';

import messages from '../messages';

class Default extends React.Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1 className="task-completed">
          <FormattedMessage {...messages.thanks} />
        </h1>

        <img src={TaskCompleted} alt="task-completed-icon" />

        <br />

        <h3 className="task-completed">
          <FormattedMessage {...messages.mocDescription} />
        </h3>

        <Button type="primary" onClick={() => this.props.history.replace('/')}>
          <FormattedMessage {...messages.backHomeBtn} />
        </Button>
      </div>
    );
  }
}

export default withRouter(Default);
