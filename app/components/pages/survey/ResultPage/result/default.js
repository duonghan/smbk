import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'antd';
import { withRouter } from 'react-router';

import messages from '../messages';

class Default extends React.Component {
  render() {
    return (
      <div>
        <h1>
          <FormattedMessage {...messages.thanks} />
        </h1>

        <br />

        <Button type="primary" onClick={() => this.props.history.replace('/')}>
          <FormattedMessage {...messages.backHomeBtn} />
        </Button>
      </div>
    );
  }
}

export default withRouter(Default);
