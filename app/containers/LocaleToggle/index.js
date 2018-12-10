/*
 *
 * LanguageToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Select } from 'antd';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { appLocales } from '../../i18n';
import { changeLocale } from '../LanguageProvider/actions';
import { makeSelectLocale } from '../LanguageProvider/selectors';

const { Option } = Select;

export class LocaleToggle extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  handleLocaleToggle = value => {
    // handleUpdate current locale into localStorage
    localStorage.setItem('lang', value);
    this.props.onLocaleToggle(value);
  };

  render() {
    return (
      <div>
        <Select
          defaultValue={this.props.locale}
          style={{ width: 120 }}
          onChange={this.handleLocaleToggle}
          size="small"
        >
          {appLocales.map(appLocale => (
            <Option value={appLocale} key={appLocale}>
              <FormattedMessage {...messages[appLocale]} />
            </Option>
          ))}
        </Select>
      </div>
    );
  }
}

LocaleToggle.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
  locale,
}));

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: value => dispatch(changeLocale(value)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaleToggle);
