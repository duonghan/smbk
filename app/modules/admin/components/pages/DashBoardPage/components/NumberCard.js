import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import CountUp from 'react-countup';
import './numberCard.css';

const NumberCard = ({ icon, color, title, number, countUp }) => (
  <Card className="numberCard" bordered style={{ backgroundColor: color }}>
    <div>
      <h3 className="title">{title || 'No Title'}</h3>
      <p className="number">
        <CountUp
          start={0}
          end={number}
          duration={2.75}
          useEasing
          useGrouping
          separator=","
          {...countUp || {}}
        />
      </p>
    </div>
  </Card>
);

NumberCard.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.number,
  countUp: PropTypes.object,
};

export default NumberCard;
