import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class MenuButton extends React.PureComponent {
  render() {
    return (
      <button className={`menu-toggle ${this.props.isActive && 'is-active'}`} />
    );
  }
}

MenuButton.propTypes = {
  isActive: PropTypes.bool,
};

export default MenuButton;
